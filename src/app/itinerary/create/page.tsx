"use client";
import React from "react";
import { useRouter } from "next/navigation";
import FormBasicInfo from "../_components/forms/FormBasicInfo";
import ItineraryBuilder from "../_components/forms/ItineraryBuilder";

export default function CreateItineraryPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Create Itinerary</h1>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded border border-gray-300 bg-white hover:bg-gray-100"
            onClick={() => router.push("/dashboard")}
          >
            Close
          </button>
          <button
            className="px-6 py-2 rounded bg-indigo-700 text-white font-semibold hover:bg-indigo-800"
            onClick={() => {/* Save & Publish logic here */}}
          >
            Save & Publish
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left: Main Form */}
        <div className="col-span-8 bg-white rounded-xl p-8 shadow">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Basic Info</h2>
            {/* TODO: Update FormBasicInfo to match new fields if needed */}
            <FormBasicInfo />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Itinerary Builder</h2>
            <ItineraryBuilder />
          </div>
        </div>
        {/* Right: Sidebar */}
        <div className="col-span-4 flex flex-col gap-6">
          {/* Assistant */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-500 text-lg">⚡</span>
              <span className="font-semibold">Assistant</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Get a draft itinerary built by AI Assistant and just edit it based on customer need!
            </p>
            <input
              className="w-full border rounded px-3 py-2 text-sm mb-2"
              placeholder="I want to..."
              disabled
            />
            <button className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500" disabled>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 19v-6m0 0V5m0 8h6m-6 0H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          {/* Search for activities */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex-1 flex flex-col">
            <h3 className="font-semibold text-lg mb-3">Search for activities</h3>
            <input
              className="w-full border rounded px-3 py-2 text-sm mb-4"
              placeholder="Search..."
              disabled
            />
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-800 mb-4">
              <span className="font-medium">Add destination details under Basic info to get more tailored recommendations</span>
            </div>
            {/* Placeholder for popular activities */}
            <div className="flex flex-col gap-3 opacity-50">
              <div className="flex items-center gap-3 bg-gray-100 rounded p-3">
                <div className="w-12 h-12 bg-gray-200 rounded" />
                <div>
                  <div className="font-medium">Anne Frank House</div>
                  <div className="text-xs text-gray-500">Explore the Jewish history of Amsterdam and the horrors of German occupation...</div>
                </div>
                <button className="ml-auto px-3 py-1 rounded bg-gray-300 text-xs" disabled>Add</button>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 rounded p-3">
                <div className="w-12 h-12 bg-gray-200 rounded" />
                <div>
                  <div className="font-medium">Taj Mahal</div>
                  <div className="text-xs text-gray-500">A masterpiece of architectural style in conception, treatment and execution...</div>
                </div>
                <button className="ml-auto px-3 py-1 rounded bg-gray-300 text-xs" disabled>Add</button>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 rounded p-3">
                <div className="w-12 h-12 bg-gray-200 rounded" />
                <div>
                  <div className="font-medium">Alps</div>
                  <div className="text-xs text-gray-500">The Alps are the highest and most extensive mountain range system in Europe...</div>
                </div>
                <button className="ml-auto px-3 py-1 rounded bg-gray-300 text-xs" disabled>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 