"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  CalendarClock,
  Crown,
  Users,
  Zap,
  BookOpen,
  Rocket,
  Bot,
} from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery} from "@tanstack/react-query";
import {
  MAX_FREE_AGENTS,
  MAX_FREE_MEETINGS,
} from "@/modules/premium/constants";
import Loading from "@/components/Loading";
import ErrorState from "@/components/ErrorState";

export default function HomeView() {
  const [activeTab, setActiveTab] = useState("agents");
  const trpc = useTRPC();
  const { data, error } = useQuery(
    trpc.premium.getFreeUsage.queryOptions()
  );

  const { data: currentSubscription } = useQuery(
    trpc.premium.getCurrentSubscription.queryOptions()
  );

  if (error) {
    console.error("Error fetching free usage data:", error);
    return <DashboardViewError />;
  }

  if (!data) {
    return <DashboardViewLoading />;
  }

  const Plan =
    currentSubscription?.name || (data.isPremium ? "Premium" : "Free");

  const agentCount = data?.agentCount || 0;
  const meetingCount = data?.meetingCount || 0;

  const infoCards = [
    {
      icon: Rocket,
      title: "What is LiaiseAI?",
      description:
        "A modern SaaS platform to create AI agents, schedule smart meetings, and collaborate efficiently with intelligent assistants.",
    },
    {
      icon: Zap,
      title: "What will it do?",
      description:
        "Create custom AI agents, host interactive meetings, get real-time assistance, and access actionable insights from transcripts.",
    },
    {
      icon: BookOpen,
      title: "What we offer",
      description: `A generous free tier (${MAX_FREE_AGENTS} agent & ${MAX_FREE_MEETINGS} meeting) and premium plans for unlimited access and advanced features.`,
    },
  ];

  return (
    <section className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start md:items-center justify-between mb-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Welcome to your Dashboard
            </h1>
            <p className="text-lg text-slate-500 mt-1">
              Here&apos;s a summary of your activity and resources.
            </p>
          </div>

          <div className="bg-sidebar from-45% via-60% to-100%  p-6 rounded-2xl text-white shadow-lg">
            <Link href="/upgrade">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">Current Plan</p>
                  <p className="text-2xl font-bold">{Plan}</p>
                </div>
                <Crown className="h-8 w-8 text-amber-400" />
              </div>
              <div className="mt-4 text-xs text-slate-300">
                {!data.isPremium ? (
                  <p>You are on the free plan. Upgrade for unlimited access!</p>
                ) : (
                  <p>Enjoy unlimited agents and meetings.</p>
                )}
              </div>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link href={"/agents"}>
                <div className=" bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-primary">
                      {agentCount}
                    </p>
                    <Bot className="h-10 w-10 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-slate-500 mt-2">
                    Your Agents
                  </p>
                </div>
              </Link>
              <Link href={"/meetings"}>
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-400/30 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-indigo-600">
                      {meetingCount}
                    </p>
                    <CalendarClock className="h-10 w-10 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-slate-500 mt-2">
                    Your Meetings
                  </p>
                </div>
              </Link>
            </div>

            {/* Getting Started Guide */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Getting Started Guide
              </h2>
              <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-lg">
                <Button
                  variant={activeTab === "agents" ? "default" : "ghost"}
                  onClick={() => setActiveTab("agents")}
                  className="flex-1"
                >
                  <Users className="h-4 w-4 mr-2" />{" "}
                  <span className="hidden md:block">Agents Guide</span>
                </Button>
                <Button
                  variant={activeTab === "meetings" ? "default" : "ghost"}
                  onClick={() => setActiveTab("meetings")}
                  className="flex-1"
                >
                  <CalendarClock className="h-4 w-4 mr-2" />{" "}
                  <span className="hidden md:block">Meetings Guide</span>
                </Button>
              </div>

              {activeTab === "agents" && (
                <ol className="list-decimal list-inside text-slate-600 space-y-2 animate-fade-in">
                  <li>
                    <span className="font-medium text-slate-800">
                      Navigate to Agents:
                    </span>{" "}
                    Go to the Agents section.
                  </li>
                  <li>
                    <span className="font-medium text-slate-800">
                      Create New Agent:
                    </span>{" "}
                    Click the &quot;Create Agent&quot; button.
                  </li>
                  <li>
                    <span className="font-medium text-slate-800">
                      Configure Agent:
                    </span>{" "}
                    Set up its personality and knowledge.
                  </li>
                  <li>
                    <span className="font-medium text-slate-800">
                      Save & Test:
                    </span>{" "}
                    Save your agent and test its responses.
                  </li>
                </ol>
              )}

              {activeTab === "meetings" && (
                <ol className="list-decimal list-inside text-slate-600 space-y-2 animate-fade-in">
                    <li>
                    <span className="font-medium text-slate-800">
                      Navigate to Meetings:
                    </span>{" "}
                    Go to the Meetings section.
                    </li>
                    <li>
                    <span className="font-medium text-slate-800">
                      Manage Existing:
                    </span>{" "}
                    You can edit or delete existing meetings.
                    </li>
                    <li>
                    <span className="font-medium text-slate-800">
                      Create New Meeting:
                    </span>{" "}
                    For new meeting click on &quot;New Meetings&quot;.
                    </li>
                    <li>
                    <span className="font-medium text-slate-800">
                      Select Agent:
                    </span>{" "}
                    Choose an agent (if not found, click &quot;Create New Agent&quot; and create it).
                    </li>
                    <li>
                    <span className="font-medium text-slate-800">
                      Start Meeting:
                    </span>{" "}
                    Click &quot;Start Meeting&quot;.
                    </li>
                    <li>
                    <span className="font-medium text-slate-800">
                      Setup Audio/Video:
                    </span>{" "}
                    Enable your microphone and camera (optional).
                    </li>
                    <li>
                    <span className="font-medium text-slate-800">
                      Get Results:
                    </span>{" "}
                    After ending the meeting, you&apos;ll receive summary, transcript, and recording.
                    </li>
                </ol>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            {/* Subscription Status */}

            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              {infoCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex gap-4 items-start"
                >
                  <div className="bg-slate-100 p-2 rounded-lg">
                    <card.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const DashboardViewLoading = () => {
  return (
    <Loading
      title="Loading Dashboard..."
      description="Please wait for few seconds..."
    />
  );
};

export const DashboardViewError = () => {
  return (
    <ErrorState
      title="Error"
      description="Oops! Something went wrong while loading dashboard."
    />
  );
};
