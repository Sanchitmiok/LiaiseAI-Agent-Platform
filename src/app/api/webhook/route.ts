import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { inngest } from "@/inngest/client";
import { streamVideo } from "@/lib/stream-video";
import {
  MessageNewEvent,
  CallEndedEvent,
  CallTranscriptionReadyEvent,
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
  CallRecordingReadyEvent,
} from "@stream-io/node-sdk";
import OpenAi from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openaiClient = new OpenAi({ apiKey: process.env.OPENAI_API_KEY! });
import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { generateAvatarUri } from "@/lib/avatar";
import { streamChat } from "@/lib/stream-chat";

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamVideo.verifyWebhook(body, signature);
}
export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  const apiKey = req.headers.get("x-api-key");

  if (!signature || !apiKey) {
    return NextResponse.json(
      {
        error: "Missing signature or API key",
      },
      { status: 400 }
    );
  }
  const body = await req.text();

  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: Record<string, unknown>;

  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = (payload as Record<string, unknown>)?.type;

  if (eventType === "call.session_started") {
    const event = payload as unknown as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json({ error: "Invalid meetingId" }, { status: 400 });
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, "completed")),
          not(eq(meetings.status, "active")),
          not(eq(meetings.status, "cancelled")),
          not(eq(meetings.status, "processing"))
        )
      );

    if (!existingMeeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    await db
      .update(meetings)
      .set({
        status: "active",
        startTime: new Date(),
      })
      .where(eq(meetings.id, meetingId));

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const call = streamVideo.video.call("default", meetingId);
    try {
      const realtimeClient = await streamVideo.video.connectOpenAi({
        call,
        openAiApiKey: process.env.OPENAI_API_KEY!,
        agentUserId: existingAgent.id,
      });

      realtimeClient.updateSession({
        instruction: existingAgent.instructions,
      });
    } catch (error) {
      console.error("Failed to connect OpenAI:", error);
      return NextResponse.json(
        { error: "Failed to establish OpenAI connection" },
        { status: 500 }
      );
    }
  } else if (eventType === "call.session_participant_left") {
    const event = payload as unknown as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];

    if (!meetingId) {
      return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
    }

    const call = streamVideo.video.call("default", meetingId);
    await call.end();
  } else if (eventType === "call.session_ended") {
    const event = payload as unknown as CallEndedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json({ error: "Missing meetingId" }, { status: 404 });
    }

    await db
      .update(meetings)
      .set({
        status: "processing",
        endTime: new Date(),
      })
      .where(and(eq(meetings.id, meetingId), eq(meetings.status, "active")));
  } else if (eventType === "call.transcription_ready") {
    const event = payload as unknown as CallTranscriptionReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

    const [updatedMeeting] = await db
      .update(meetings)
      .set({
        transcriptUrl: event.call_transcription.url,
      })
      .where(eq(meetings.id, meetingId))
      .returning();

    if (!updatedMeeting) {
      return NextResponse.json(
        { error: "Error during meeting updation" },
        { status: 404 }
      );
    }

    // Call Inngest background job to summerize the transcript

    await inngest.send({
      name: "meetings/processing",
      data: {
        meetingId: updatedMeeting.id,
        transcriptUrl: updatedMeeting.transcriptUrl,
      },
    });
  } else if (eventType === "call.recording_ready") {
    const event = payload as unknown as CallRecordingReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

    await db
      .update(meetings)
      .set({
        recordingUrl: event.call_recording.url,
      })
      .where(eq(meetings.id, meetingId));
  } else if (eventType === "message.new") {
    const event = payload as unknown as MessageNewEvent;
    const userId = event.user?.id;
    const channelId = event.channel_id;
    const text = event.message?.text;

    if (!userId || !channelId || !text) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(and(eq(meetings.id, channelId), eq(meetings.status, "completed")));

    if (!existingMeeting) {
      return NextResponse.json(
        {
          error: "Meeting not found",
        },
        {
          status: 404,
        }
      );
    }
    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent) {
      return NextResponse.json(
        {
          error: "Agent not found",
        },
        {
          status: 404,
        }
      );
    }

    if (userId !== existingAgent.id) {
      const instructions = `You are an AI assistant helping the user review a recent meeting.  
            Meeting Summary: ${existingMeeting.summary}  
            Instructions: Follow the original behavioral guidelines from the live meeting assistant: ${existingAgent.instructions}  

            The user may ask about the meeting, seek clarifications, or request follow-up actions. Base responses on the meeting summary and recent conversation history for relevance and continuity.  
            If the summary lacks details to answer a question, politely inform the user. 
            Respond concisely, accurately, and helpfully.
            `;
      const channel = streamChat.channel("messaging", channelId);
      await channel.watch();

      const previousMessages = channel.state.messages
        .slice(-5)
        .filter((msg) => msg.text && msg.text.trim() !== "")
        .map<ChatCompletionMessageParam>((msg) => ({
          role: msg.user?.id === existingAgent.id ? "assistant" : "user",
          content: msg.text || "",
        }));

      const GPTResponse = await openaiClient.chat.completions.create({
        messages: [
          {
            role: "system",
            content: instructions,
          },
          ...previousMessages,
          { role: "user", content: text },
        ],
        model: "gpt-3.5-turbo",
      });

      const GPTResponseText = GPTResponse.choices[0].message.content;

      if (!GPTResponseText) {
        return NextResponse.json(
          { error: "No response from GPT" },
          { status: 400 }
        );
      }

      const avatarUrl = generateAvatarUri({
        seed: existingAgent.name,
        variant: "botttsNeutral",
      });

      streamChat.upsertUser({
        id: existingAgent.id,
        name: existingAgent.name,
        image: avatarUrl,
      });

      channel.sendMessage({
        text: GPTResponseText,
        user: {
          id: existingAgent.id,
          name: existingAgent.name,
          image: avatarUrl,
        },
      });
    }
  }
  return NextResponse.json({ status: 200 });
}
