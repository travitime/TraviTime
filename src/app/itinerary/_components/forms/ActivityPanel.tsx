"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Upload, ArrowLeft, ArrowRight, Clock, Plane, Plus, X, GripVertical, ChevronUp, ChevronDown } from "lucide-react";

const TIME_BLOCKS = ["Morning", "Noon", "Evening"];

interface Activity {
  id: string;
  title: string;
  description: string;
  notes: string;
  photos: string[];
}

interface Day {
  id: number;
  blocks: Activity[][];
}

interface ActivityPanelProps {
  selectedCell: { dayIdx: number; blockIdx: number } | null;
  days: Day[];
  selectedActivityIdx: number;
  draggedActivityIdx: number | null;
  formData: {
    title: string;
    description: string;
    notes: string;
  };
  onCellClose: () => void;
  onActivitySelect: (activityIdx: number) => void;
  onAddActivity: () => void;
  onDeleteActivity: (activityIdx: number) => void;
  onDragStart: (e: React.DragEvent, activityIdx: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, dropActivityIdx: number) => void;
  onDragEnd: () => void;
  onMoveActivityUp: (activityIdx: number) => void;
  onMoveActivityDown: (activityIdx: number) => void;
  onFormDataChange: (field: string, value: string) => void;
  onSave: () => void;
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

export default function ActivityPanel({
  selectedCell,
  days,
  selectedActivityIdx,
  draggedActivityIdx,
  formData,
  onCellClose,
  onActivitySelect,
  onAddActivity,
  onDeleteActivity,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onMoveActivityUp,
  onMoveActivityDown,
  onFormDataChange,
  onSave,
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled
}: ActivityPanelProps) {
  
  // Local state for Ask AI workflow - moved to top to avoid conditional hooks
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const getSelectedDayAndTime = () => {
    if (!selectedCell) return { day: "Day 1", time: "Morning" };
    return {
      day: `Day ${days[selectedCell.dayIdx].id}`,
      time: TIME_BLOCKS[selectedCell.blockIdx]
    };
  };

  const getCurrentActivities = () => {
    if (!selectedCell) return [];
    return days[selectedCell.dayIdx].blocks[selectedCell.blockIdx];
  };

  // Handler for Ask AI button
  const handleAskAI = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch("/api/ai-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: formData.title, description: formData.description })
      });
      if (!res.ok) throw new Error("Failed to get AI description");
      const data = await res.json();
      if (data.description) {
        onFormDataChange("description", data.description);
      } else {
        throw new Error("No description returned");
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      setAiError(error.message || "AI request failed");
    } finally {
      setAiLoading(false);
    }
  };

  // Search For Activities Component (Initial State)
  if (!selectedCell) {
    return (
      <div className="w-full bg-white rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Search for activities</h2>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Input 
              placeholder=""
              className="pl-10 border-2 border-blue-400 rounded-md"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          {/* Popular Activities */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Popular activities in Amsterdam</h3>
            <div className="space-y-4">
              {[
                {
                  image: "/api/placeholder/80/80",
                  title: "Anne Frank House",
                  description: "Explore the Jewish history of Amsterdam and the horrors of German occupation..",
                },
                {
                  image: "/api/placeholder/80/80", 
                  title: "Bike tour",
                  description: "At the end of the Amsterdam Highlights Bike Tour, which lasts two and a half hours...",
                },
                {
                  image: "/api/placeholder/80/80",
                  title: "Canal Cruise", 
                  description: "The best way to discover the canals of Amsterdam is with a canal cruise...",
                }
              ].map((activity, index) => (
                <div key={index} className="flex gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  {/* Activity Image */}
                  <div className="w-20 h-20 flex-shrink-0">
                    <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                      {activity.title === "Anne Frank House" && (
                        <div className="w-full h-full bg-gradient-to-b from-blue-400 to-orange-300 rounded-md flex items-center justify-center">
                          <div className="text-white text-xs">🏠</div>
                        </div>
                      )}
                      {activity.title === "Bike tour" && (
                        <div className="w-full h-full bg-gradient-to-b from-green-400 to-blue-300 rounded-md flex items-center justify-center">
                          <div className="text-white text-xs">🚴</div>
                        </div>
                      )}
                      {activity.title === "Canal Cruise" && (
                        <div className="w-full h-full bg-gradient-to-b from-blue-500 to-green-400 rounded-md flex items-center justify-center">
                          <div className="text-white text-xs">🚢</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      {activity.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                      {activity.description}
                    </p>
                    <div className="flex justify-end">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-xs px-3 py-1 h-7"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Edit Activities Component (Shows when cell is selected)
  return (
    <div className="w-full bg-white rounded-lg p-6">
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit Activities</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onCellClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Day and Time Selection */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Clock className="w-4 h-4 text-gray-500" />
            <Select value={getSelectedDayAndTime().day} className="bg-white">
              {days.map((day) => (
                <option key={day.id} value={`Day ${day.id}`}>
                  Day {day.id}
                </option>
              ))}
            </Select>
          </div>
          
          <div className="flex-1">
            <Select value={getSelectedDayAndTime().time} className="bg-white">
              {TIME_BLOCKS.map((block) => (
                <option key={block} value={block}>
                  {block}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Activities List */}
        {getCurrentActivities().length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Activities in this slot</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onAddActivity}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
            
            <div className="space-y-2">
              {getCurrentActivities().map((activity, idx) => (
                <div 
                  key={activity.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, idx)}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, idx)}
                  onDragEnd={onDragEnd}
                  className={`group p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedActivityIdx === idx 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${
                    draggedActivityIdx === idx 
                      ? 'opacity-50 scale-95' 
                      : ''
                  }`}
                  onClick={() => onActivitySelect(idx)}
                >
                  <div className="flex items-center gap-3">
                    {/* Drag Handle */}
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveActivityUp(idx);
                        }}
                        disabled={idx === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <GripVertical className="w-4 h-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveActivityDown(idx);
                        }}
                        disabled={idx === getCurrentActivities().length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Activity Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {activity.title || `Activity ${idx + 1}`}
                          </p>
                          {activity.description && (
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {activity.description}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteActivity(idx);
                          }}
                          className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 px-3">
              💡 Tip: Drag to reorder activities
            </div>
          </div>
        )}

        {/* Add Activity Button for empty slots */}
        {getCurrentActivities().length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <Plane className="w-8 h-8 mx-auto mb-3 text-gray-300" />
            <p className="text-sm text-gray-500 mb-4">No activities planned for this time slot</p>
            <Button 
              onClick={onAddActivity}
              className="flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add First Activity
            </Button>
          </div>
        )}

        {/* Activity Editor Form */}
        {getCurrentActivities().length > 0 && (
          <>
            {/* Search Bar */}
            <div className="relative">
              <Input 
                placeholder="Search activities to add..."
                className="pl-10"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Activity Details */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Activity details</h3>
              
              <div className="space-y-4 border border-gray-200 rounded-lg ">
                <div className="flex gap-3">
                  <div className=" bg-gray-100 p-2">
                    <Plane className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <Input
                      placeholder="Title"
                      value={formData.title}
                      onChange={(e) => onFormDataChange('title', e.target.value)}
                      className="font-medium border-none"
                    />
                    <div className="space-y-2 relative">
                      <Textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => onFormDataChange('description', e.target.value)}
                        className="resize-none border-none pr-20"
                        rows={2}
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2 z-10 px-2 py-1 text-xs"
                        onClick={handleAskAI}
                        disabled={aiLoading}
                      >
                        {aiLoading ? 'Generating...' : 'Ask AI'}
                      </Button>
                    </div>
                    {aiError && (
                      <div className="absolute right-0 mt-8 text-xs text-red-500 bg-white px-2 py-1 rounded shadow border border-red-200">
                        {aiError}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Photos */}
            <div className="space-y-3">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <div className="space-y-2">
                  <Upload className="w-5 h-5 text-gray-400 mx-auto" />
                  <div>
                    <p className="font-medium text-gray-900 text-xs">Upload Photos</p>
                    <p className="text-xs text-gray-500">Up to 5 photos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-3">
              <label className="font-medium text-gray-900">Notes</label>
              <Textarea
                placeholder="Add any additional notes..."
                value={formData.notes}
                onChange={(e) => onFormDataChange('notes', e.target.value)}
                className="resize-none"
                rows={2}
              />
            </div>

            {/* Save Button */}
            <Button 
              onClick={onSave}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Save Activity
            </Button>
          </>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            disabled={isPreviousDisabled}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button 
            variant="outline" 
            onClick={onNext}
            disabled={isNextDisabled}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}