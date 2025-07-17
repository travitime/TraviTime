"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormBasicInfo from "../_components/forms/FormBasicInfo";
import ItineraryBuilder from "../_components/forms/ItineraryBuilder";
import ActivityPanel from "../_components/forms/ActivityPanel";

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

export default function CreateItineraryPage() {
  const router = useRouter();
  
  // Lifted state from ItineraryBuilder
  const [days, setDays] = useState<Day[]>([
    { 
      id: 1, 
      blocks: [[], [], []] // Morning, Noon, Evening - each empty initially
    },
    { 
      id: 2, 
      blocks: [[], [], []]
    },
  ]);
  
  const [selectedCell, setSelectedCell] = useState<{ dayIdx: number; blockIdx: number } | null>(null);
  const [selectedActivityIdx, setSelectedActivityIdx] = useState<number>(0);
  const [draggedActivityIdx, setDraggedActivityIdx] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    notes: ""
  });

  const generateActivityId = () => {
    return `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleCellClick = (dayIdx: number, blockIdx: number) => {
    setSelectedCell({ dayIdx, blockIdx });
    const activities = days[dayIdx].blocks[blockIdx];
    
    if (activities.length > 0) {
      setSelectedActivityIdx(0);
      const activity = activities[0];
      setFormData({
        title: activity.title,
        description: activity.description,
        notes: activity.notes
      });
    } else {
      setSelectedActivityIdx(0);
      setFormData({
        title: "",
        description: "",
        notes: ""
      });
    }
  };

  const handleActivitySelect = (activityIdx: number) => {
    if (!selectedCell) return;
    
    const activities = days[selectedCell.dayIdx].blocks[selectedCell.blockIdx];
    if (activities[activityIdx]) {
      setSelectedActivityIdx(activityIdx);
      const activity = activities[activityIdx];
      setFormData({
        title: activity.title,
        description: activity.description,
        notes: activity.notes
      });
    }
  };

  const handleSave = () => {
    if (!selectedCell) return;
    
    const newDays = [...days];
    const activities = newDays[selectedCell.dayIdx].blocks[selectedCell.blockIdx];
    
    if (activities[selectedActivityIdx]) {
      activities[selectedActivityIdx] = {
        ...activities[selectedActivityIdx],
        title: formData.title,
        description: formData.description,
        notes: formData.notes
      };
    } else {
      activities.push({
        id: generateActivityId(),
        title: formData.title,
        description: formData.description,
        notes: formData.notes,
        photos: []
      });
    }
    
    setDays(newDays);
  };

  const handleAddActivity = () => {
    if (!selectedCell) return;
    
    const newDays = [...days];
    const activities = newDays[selectedCell.dayIdx].blocks[selectedCell.blockIdx];
    
    const newActivity: Activity = {
      id: generateActivityId(),
      title: "",
      description: "",
      notes: "",
      photos: []
    };
    
    activities.push(newActivity);
    setDays(newDays);
    
    setSelectedActivityIdx(activities.length - 1);
    setFormData({
      title: "",
      description: "",
      notes: ""
    });
  };

  const handleDeleteActivity = (activityIdx: number) => {
    if (!selectedCell) return;
    
    const newDays = [...days];
    const activities = newDays[selectedCell.dayIdx].blocks[selectedCell.blockIdx];
    
    activities.splice(activityIdx, 1);
    setDays(newDays);
    
    if (activities.length === 0) {
      setSelectedActivityIdx(0);
      setFormData({ title: "", description: "", notes: "" });
    } else if (selectedActivityIdx >= activities.length) {
      const newIdx = activities.length - 1;
      setSelectedActivityIdx(newIdx);
      const activity = activities[newIdx];
      setFormData({
        title: activity.title,
        description: activity.description,
        notes: activity.notes
      });
    }
  };

  const handleDragStart = (e: React.DragEvent, activityIdx: number) => {
    setDraggedActivityIdx(activityIdx);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropActivityIdx: number) => {
    e.preventDefault();
    
    if (!selectedCell || draggedActivityIdx === null || draggedActivityIdx === dropActivityIdx) {
      setDraggedActivityIdx(null);
      return;
    }

    const newDays = [...days];
    const activities = newDays[selectedCell.dayIdx].blocks[selectedCell.blockIdx];
    
    const draggedActivity = activities[draggedActivityIdx];
    activities.splice(draggedActivityIdx, 1);
    activities.splice(dropActivityIdx, 0, draggedActivity);
    
    setDays(newDays);
    
    if (selectedActivityIdx === draggedActivityIdx) {
      setSelectedActivityIdx(dropActivityIdx);
    } else if (selectedActivityIdx > draggedActivityIdx && selectedActivityIdx <= dropActivityIdx) {
      setSelectedActivityIdx(selectedActivityIdx - 1);
    } else if (selectedActivityIdx < draggedActivityIdx && selectedActivityIdx >= dropActivityIdx) {
      setSelectedActivityIdx(selectedActivityIdx + 1);
    }
    
    setDraggedActivityIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedActivityIdx(null);
  };

  const moveActivityUp = (activityIdx: number) => {
    if (!selectedCell || activityIdx === 0) return;
    
    const newDays = [...days];
    const activities = newDays[selectedCell.dayIdx].blocks[selectedCell.blockIdx];
    
    [activities[activityIdx - 1], activities[activityIdx]] = [activities[activityIdx], activities[activityIdx - 1]];
    
    setDays(newDays);
    
    if (selectedActivityIdx === activityIdx) {
      setSelectedActivityIdx(activityIdx - 1);
    } else if (selectedActivityIdx === activityIdx - 1) {
      setSelectedActivityIdx(activityIdx);
    }
  };

  const moveActivityDown = (activityIdx: number) => {
    if (!selectedCell) return;
    
    const activities = days[selectedCell.dayIdx].blocks[selectedCell.blockIdx];
    if (activityIdx === activities.length - 1) return;
    
    const newDays = [...days];
    const newActivities = newDays[selectedCell.dayIdx].blocks[selectedCell.blockIdx];
    
    [newActivities[activityIdx], newActivities[activityIdx + 1]] = [newActivities[activityIdx + 1], newActivities[activityIdx]];
    
    setDays(newDays);
    
    if (selectedActivityIdx === activityIdx) {
      setSelectedActivityIdx(activityIdx + 1);
    } else if (selectedActivityIdx === activityIdx + 1) {
      setSelectedActivityIdx(activityIdx);
    }
  };

  const handleAddDay = () => {
    setDays([
      ...days,
      { 
        id: days.length + 1, 
        blocks: [[], [], []]
      },
    ]);
  };

  const handleCellClose = () => {
    setSelectedCell(null);
  };

  const handleFormDataChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePrevious = () => {
    if (!selectedCell) return;
    
    let { dayIdx, blockIdx } = selectedCell;
    
    if (blockIdx > 0) {
      blockIdx--;
    } else if (dayIdx > 0) {
      dayIdx--;
      blockIdx = TIME_BLOCKS.length - 1;
    }
    
    if (dayIdx >= 0) {
      handleCellClick(dayIdx, blockIdx);
    }
  };

  const handleNext = () => {
    if (!selectedCell) return;
    
    let { dayIdx, blockIdx } = selectedCell;
    
    if (blockIdx < TIME_BLOCKS.length - 1) {
      blockIdx++;
    } else if (dayIdx < days.length - 1) {
      dayIdx++;
      blockIdx = 0;
    }
    
    if (dayIdx < days.length) {
      handleCellClick(dayIdx, blockIdx);
    }
  };

  const isPreviousDisabled = selectedCell?.dayIdx === 0 && selectedCell?.blockIdx === 0;
  const isNextDisabled = selectedCell?.dayIdx === days.length - 1 && selectedCell?.blockIdx === TIME_BLOCKS.length - 1;

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
            <FormBasicInfo />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Itinerary Builder</h2>
            <ItineraryBuilder 
              days={days}
              selectedCell={selectedCell}
              onCellClick={handleCellClick}
              onAddDay={handleAddDay}
            />
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
          
          {/* Activity Panel */}
          <div className="flex-1 ">
            <ActivityPanel
              selectedCell={selectedCell}
              days={days}
              selectedActivityIdx={selectedActivityIdx}
              draggedActivityIdx={draggedActivityIdx}
              formData={formData}
              onCellClose={handleCellClose}
              onActivitySelect={handleActivitySelect}
              onAddActivity={handleAddActivity}
              onDeleteActivity={handleDeleteActivity}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              onMoveActivityUp={moveActivityUp}
              onMoveActivityDown={moveActivityDown}
              onFormDataChange={handleFormDataChange}
              onSave={handleSave}
              onPrevious={handlePrevious}
              onNext={handleNext}
              isPreviousDisabled={isPreviousDisabled}
              isNextDisabled={isNextDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 