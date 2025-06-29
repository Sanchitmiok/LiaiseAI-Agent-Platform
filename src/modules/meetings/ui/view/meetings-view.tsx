"use client";

import ErrorState from "@/components/ErrorState";
import Loading from "@/components/Loading";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0-5V3m-8 4v6a4 4 0 004 4h4"></path>
      </svg>
      Meetings
      </h1>
      <div className="flex flex-col gap-6">
      {data?.items.map((meeting) => (
        <div
        key={meeting.id}
        className="bg-white shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-shadow"
        >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-900">{meeting.name}</h2>
          <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            meeting.status === "completed"
            ? "bg-green-100 text-green-700"
            : meeting.status === "active"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-gray-100 text-gray-600"
          }`}
          >
          {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
          <div>
          <span className="font-medium">Agent ID:</span> {meeting.agentId}
          </div>
          <div>
          <span className="font-medium">User ID:</span> {meeting.userId}
          </div>
          <div>
          <span className="font-medium">Start:</span> {new Date(meeting.startTime).toLocaleString()}
          </div>
          <div>
          <span className="font-medium">End:</span> {new Date(meeting.endTime).toLocaleString()}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          {meeting.transcriptUrl && (
          <a
            href={meeting.transcriptUrl}
            className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9"></path>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3"></path>
            </svg>
            View Transcript
          </a>
          )}
          {meeting.recordingUrl && (
          <a
            href={meeting.recordingUrl}
            className="inline-flex items-center px-3 py-1 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.118v7.764a1 1 0 001.234.97l6.518-1.757A1 1 0 0016 14.882V9.118a1 1 0 00-1.248-.95z"></path>
            </svg>
            Watch Recording
          </a>
          )}
        </div>
        {meeting.summary && (
          <div className="mt-4 bg-gray-50 rounded p-3 text-gray-700">
          <span className="font-medium text-gray-800">Summary:</span> {meeting.summary}
          </div>
        )}
        <div className="flex justify-between mt-4 text-xs text-gray-400">
          <span>Created: {new Date(meeting.createdAt).toLocaleString()}</span>
          <span>Updated: {new Date(meeting.updatedAt).toLocaleString()}</span>
        </div>
        </div>
      ))}
      </div>
      {data && data.items.length === 0 && (
      <div className="text-center text-gray-500 mt-12">
        <svg className="mx-auto mb-2 w-12 h-12 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"></path>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"></circle>
        </svg>
        <p className="text-lg font-medium">No meetings found.</p>
      </div>
      )}
    </div>
  );
};

export const MeetingsViewLoading = () => {
  return (
    <Loading
      title="Loading Meetings"
      description="Please wait for few seconds..."
    />
  );
};
export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error loading Meetings"
      description="Oops! Something went wrong while loading meetings."
    />
  );
};
