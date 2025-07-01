import React from "react";

interface Props {
  MeetingId : string
}

const MeetingPage = ({MeetingId} : Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">Meeting Details</h1>
        <p className="text-gray-600 mb-2">You are viewing meeting:</p>
        <div className="text-2xl font-mono bg-indigo-50 rounded-lg px-4 py-2 inline-block text-indigo-900 shadow">
          {MeetingId}
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;