"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HomeView() {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <section className=" bg-gradient-to-br  from-primary/5 to-white flex flex-col items-center justify-center px-4 py-10 ">
      <div className="w-full bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col gap-8 border border-border/10">
        {/* Project Introduction */}
        <div className="flex flex-col gap-2 text-center">
          {/* <img src="/logo.svg" alt="Logo" className="mx-auto mb-2 w-16 h-16" /> */}
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Welcome to LiaiseAI</h1>
          <p className="text-lg text-gray-700">Your AI-powered platform to create, manage, and join smart agent meetings.</p>
        </div>

        {/* What is the project */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-gray-900">What is LiaiseAI?</h2>
          <p className="text-gray-600">LiaiseAI is a modern SaaS platform that enables users to create AI agents, schedule meetings, and collaborate efficiently with the help of intelligent assistants. Whether you need a virtual tutor, a business assistant, or a custom AI agent, LiaiseAI empowers you to build and manage them with ease.</p>
        </div>

        {/* What will it do */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-gray-900">What will it do?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Create and customize AI agents for various tasks.</li>
            <li>Schedule and host interactive meetings with AI support.</li>
            <li>Collaborate, chat, and get real-time assistance during meetings.</li>
            <li>Access meeting summaries, transcripts, and actionable insights.</li>
          </ul>
        </div>

        {/* What we offer */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-gray-900">What we offer for our users</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Free tier: 1 agent & 1 meeting to get started.</li>
            <li>Premium plans for unlimited agents, meetings, and advanced features.</li>
            <li>Easy-to-use interface and seamless onboarding.</li>
            <li>Secure, privacy-focused, and always available.</li>
          </ul>
        </div>

        {/* Steps to create agent meeting */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-gray-900">How to create an Agent Meeting?</h2>
          <Button
            variant="outline"
            className="w-fit mx-auto mb-2"
            onClick={() => setShowSteps((v) => !v)}
            aria-expanded={showSteps}
          >
            {showSteps ? "Hide Steps" : "Show Steps"}
          </Button>
          {showSteps && (
            <ol className="list-decimal list-inside text-gray-700 space-y-2 bg-gray-50 rounded-lg p-4 border border-border/10 animate-fade-in">
              <li>
                <span className="font-medium">Create an Agent:</span> Go to <Link href="/agents" className="text-primary underline">My Agents</Link> and click <span className="font-semibold">Create Agent</span>.
              </li>
              <li>
                <span className="font-medium">Schedule a Meeting:</span> Go to <Link href="/meetings" className="text-primary underline">My Meetings</Link> and click <span className="font-semibold">New Meeting</span>.
              </li>
              <li>
                <span className="font-medium">Select Agent:</span> Choose your agent for the meeting.
              </li>
              <li>
                <span className="font-medium">Start Meeting:</span> Join the meeting and collaborate with your AI agent.
              </li>
            </ol>
          )}
          <div className="flex flex-col md:flex-row gap-2 mt-4 justify-center">
            <Button asChild className="w-full md:w-auto">
              <Link href="/meetings">Go to Meetings</Link>
            </Button>
            <Button asChild variant="secondary" className="w-full md:w-auto">
              <Link href="/agents">Go to Agents</Link>
            </Button>
          </div>
        </div>

        {/* Upgrade Button */}
        <div className="flex flex-col items-center gap-2 mt-6">
          <span className="text-gray-700 text-sm">Want more agents or meetings?</span>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg hover:scale-105 transition-transform">
            <Link href="/upgrade">Upgrade Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
