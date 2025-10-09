"use client";
import React, { useState } from "react";
import { JumpToSection } from "@/components/ui/jump-to-section";
import FormTravellersList from "../_components/forms/FormTravellersList";
import ItineraryBuilder from "../_components/forms/ItineraryBuilder";
import { CreateHeader } from "@/components/ui/create-header";
import { useRouter } from "next/navigation";

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

const sections = [
  { id: "section1", label: "Basic Info" },
  { id: "section2", label: "Trip Info" },
  { id: "section3", label: "Group Info" },
  { id: "section4", label: "Itinerary Info" },
];

export default function DashboardPage() {
  const router = useRouter();
  
  // State for ItineraryBuilder
  const [days, setDays] = useState<Day[]>([
    { id: 1, blocks: [[], [], []] },
    { id: 2, blocks: [[], [], []] },
    { id: 3, blocks: [[], [], []] },
  ]);
  const [selectedCell, setSelectedCell] = useState<{ dayIdx: number; blockIdx: number } | null>(null);
  const [draggedActivityInfo, setDraggedActivityInfo] = useState<{
    dayIdx: number;
    blockIdx: number;
    activityIdx: number;
  } | null>(null);

  const handleCellClick = (dayIdx: number, blockIdx: number) => {
    setSelectedCell({ dayIdx, blockIdx });
  };

  const handleAddDay = () => {
    const newDay: Day = {
      id: days.length + 1,
      blocks: [[], [], []]
    };
    setDays([...days, newDay]);
  };

  const handleActivityDragStart = (
    e: React.DragEvent,
    dayIdx: number,
    blockIdx: number,
    activityIdx: number
  ) => {
    setDraggedActivityInfo({ dayIdx, blockIdx, activityIdx });
  };

  const handleCellDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleCellDrop = (
    e: React.DragEvent,
    dayIdx: number,
    blockIdx: number
  ) => {
    e.preventDefault();
    if (!draggedActivityInfo) return;

    // Implementation for moving activities between cells
    // This is a simplified version - you may need more complex logic
    console.log('Dropping at:', dayIdx, blockIdx);
    setDraggedActivityInfo(null);
  };

  const handleActivityDragEnd = () => {
    setDraggedActivityInfo(null);
  };

  return (
    <div className="w-full">
      <CreateHeader
        title="Create Itinerary"
        secondaryAction={{
          label: "Close",
          onClick: () => {
            router.push("/dashboard");
          },
        }}
        primaryAction={{
          label: "Save Itinerary",
          onClick: () => {
            router.push("/itinerary/list");
          },
        }}
      />
      <div className="grid grid-cols-12">
        <aside className="col-span-2">
          <JumpToSection sections={sections} />
        </aside>
        <div className="col-span-6">
          <FormTravellersList />
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
      </div>
    </div>
  );
}
