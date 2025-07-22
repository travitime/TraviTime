"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateHeader } from "@/components/ui/create-header";
import FormBasicInfo from "../_components/forms/FormBasicInfo";
import ItineraryBuilder from "../_components/forms/ItineraryBuilder";
import ActivityPanel from "../_components/forms/ActivityPanel";
import AIAssist from "@/app/dashboard/_components/quick-actions/AIAssist";
import Card from "@/app/dashboard/_components/Card";

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
  const [draggedActivityInfo, setDraggedActivityInfo] = useState<{
    dayIdx: number;
    blockIdx: number;
    activityIdx: number;
  } | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    notes: ""
  });

  // Add chat mode state here
  const [isChatMode, setIsChatMode] = useState(false);

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

  const handleActivityDragStart = (
    e: React.DragEvent,
    dayIdx: number,
    blockIdx: number,
    activityIdx: number
  ) => {
    setDraggedActivityInfo({ dayIdx, blockIdx, activityIdx });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({ dayIdx, blockIdx, activityIdx }));
  };

  const handleCellDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleCellDrop = (
    e: React.DragEvent,
    targetDayIdx: number,
    targetBlockIdx: number
  ) => {
    e.preventDefault();
    if (!draggedActivityInfo) return;
    const { dayIdx: sourceDayIdx, blockIdx: sourceBlockIdx, activityIdx } = draggedActivityInfo;
    // Don't drop into the same cell
    if (sourceDayIdx === targetDayIdx && sourceBlockIdx === targetBlockIdx) {
      setDraggedActivityInfo(null);
      return;
    }
    const newDays = [...days];
    const sourceActivities = newDays[sourceDayIdx].blocks[sourceBlockIdx];
    const [movedActivity] = sourceActivities.splice(activityIdx, 1);
    newDays[targetDayIdx].blocks[targetBlockIdx].push(movedActivity);
    setDays(newDays);
    setDraggedActivityInfo(null);
  };

  const handleActivityDragEnd = () => {
    setDraggedActivityInfo(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <CreateHeader
        title="Create Itinerary"
        primaryAction={{ label: "Create Itinerary", onClick: () => {} }}
        secondaryAction={{ label: "Close", onClick: () => {
          router.push("/itinerary/list");
        } }}
      />  
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4">
         <Card bg="bg-white"   padding="p-4" title="Basic Information">
          <FormBasicInfo />
         </Card>
          <ItineraryBuilder 
            days={days}
            selectedCell={selectedCell}
            onCellClick={handleCellClick}
            onAddDay={handleAddDay}
            onActivityDragStart={handleActivityDragStart}
            onCellDragOver={handleCellDragOver}
            onCellDrop={handleCellDrop}
            onActivityDragEnd={handleActivityDragEnd}
            draggedActivityInfo={draggedActivityInfo}
          />
        </div>
        
        {/* Right: Sidebar */}
        <div className="w-1/3 p-4 sm:p-6 md:p-8 border-l border-gray-200 overflow-auto flex flex-col">
          {/* Assistant */}
          <AIAssist isChatMode={isChatMode} setIsChatMode={setIsChatMode} />
          {/* Activity Panel - only show if not in chat mode */}
          {!isChatMode && (
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
          )}
        </div>
      </div>
    </div>
  );
} 