"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Upload, ArrowLeft, ArrowRight, Clock, Plane, MapPin, Globe, Plus, X, GripVertical, ChevronUp, ChevronDown } from "lucide-react";

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
  blocks: Activity[][]; // Array of arrays - each time block can have multiple activities
}

export default function ItineraryBuilder() {
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

  // Basic Info form state
  const [basicInfo, setBasicInfo] = useState({
    itineraryId: "ITI-0001",
    destinationCities: "Amsterdam, Paris, Berlin",
    destinationCountries: "Netherlands, France, Germany",
    tags: ["Leisure", "Kids friendly"],
    numberOfDays: 2
  });

  const generateActivityId = () => {
    return `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleCellClick = (dayIdx: number, blockIdx: number) => {
    setSelectedCell({ dayIdx, blockIdx });
    const activities = days[dayIdx].blocks[blockIdx];
    
    if (activities.length > 0) {
      // Select the first activity by default
      setSelectedActivityIdx(0);
      const activity = activities[0];
      setFormData({
        title: activity.title,
        description: activity.description,
        notes: activity.notes
      });
    } else {
      // No activities, prepare for new one
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
      // Update existing activity
      activities[selectedActivityIdx] = {
        ...activities[selectedActivityIdx],
        title: formData.title,
        description: formData.description,
        notes: formData.notes
      };
    } else {
      // Add new activity
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
    
    // Add new empty activity
    const newActivity: Activity = {
      id: generateActivityId(),
      title: "",
      description: "",
      notes: "",
      photos: []
    };
    
    activities.push(newActivity);
    setDays(newDays);
    
    // Switch to the new activity
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
    
    // Adjust selected activity index
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

  // Drag and Drop Functions
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
    
    // Reorder activities
    const draggedActivity = activities[draggedActivityIdx];
    activities.splice(draggedActivityIdx, 1);
    activities.splice(dropActivityIdx, 0, draggedActivity);
    
    setDays(newDays);
    
    // Update selected activity index if needed
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

  // Move Up/Down Functions (alternative to drag-drop)
  const moveActivityUp = (activityIdx: number) => {
    if (!selectedCell || activityIdx === 0) return;
    
    const newDays = [...days];
    const activities = newDays[selectedCell.dayIdx].blocks[selectedCell.blockIdx];
    
    // Swap with previous activity
    [activities[activityIdx - 1], activities[activityIdx]] = [activities[activityIdx], activities[activityIdx - 1]];
    
    setDays(newDays);
    
    // Update selected activity index
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
    
    // Swap with next activity
    [newActivities[activityIdx], newActivities[activityIdx + 1]] = [newActivities[activityIdx + 1], newActivities[activityIdx]];
    
    setDays(newDays);
    
    // Update selected activity index
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
    setBasicInfo({ ...basicInfo, numberOfDays: days.length + 1 });
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Create Itinerary</h1>
          <div className="flex gap-3">
            <Button variant="outline">Close</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">Save & Publish</Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Activity Editor - Full Width */}
        {selectedCell && (
          <div className="bg-white rounded-lg p-6 mb-8">
            <div className="space-y-6">
              {/* Day and Time Selection */}
              <div className="flex gap-4 max-w-md">
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
                      onClick={handleAddActivity}
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Activity
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Activities List Column */}
                    <div className="space-y-2">
                      {getCurrentActivities().map((activity, idx) => (
                        <div 
                          key={activity.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, idx)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, idx)}
                          onDragEnd={handleDragEnd}
                          className={`group p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedActivityIdx === idx 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          } ${
                            draggedActivityIdx === idx 
                              ? 'opacity-50 scale-95' 
                              : ''
                          }`}
                          onClick={() => handleActivitySelect(idx)}
                        >
                          <div className="flex items-center gap-3">
                            {/* Drag Handle */}
                            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveActivityUp(idx);
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
                                  moveActivityDown(idx);
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
                                    handleDeleteActivity(idx);
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
                      <div className="text-xs text-gray-500 mt-2 px-3">
                        💡 Tip: Drag activities to reorder them, or use the arrow buttons
                      </div>
                    </div>

                    {/* Activity Editor Form Column */}
                    <div className="space-y-6">
                      {/* Search Bar */}
                      <div className="relative">
                        <Input 
                          placeholder="Search activities, places, or experiences..."
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
                        
                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <div className="mt-1">
                              <Plane className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="flex-1 space-y-3">
                              <Input
                                placeholder="Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="font-medium"
                              />
                              <Textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="resize-none"
                                rows={3}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Upload Photos */}
                      <div className="space-y-3">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <div className="space-y-2">
                            <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                            <div>
                              <p className="font-medium text-gray-900 text-sm">Upload Photos</p>
                              <p className="text-xs text-gray-500">You can upload upto 5 photos for this activity</p>
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
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="resize-none"
                          rows={3}
                        />
                      </div>

                      {/* Save Button */}
                      <Button 
                        onClick={handleSave}
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add Activity Button for empty slots */}
              {getCurrentActivities().length === 0 && (
                <div className="text-center py-8">
                  <Button 
                    onClick={handleAddActivity}
                    className="flex items-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add First Activity
                  </Button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={selectedCell?.dayIdx === 0 && selectedCell?.blockIdx === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Activity
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleNext}
                  disabled={selectedCell?.dayIdx === days.length - 1 && selectedCell?.blockIdx === TIME_BLOCKS.length - 1}
                  className="flex items-center gap-2"
                >
                  Next Activity
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Itinerary Builder Table */}
        <div className="bg-white rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Itinerary Builder</h2>
          </div>
          
          <div className="p-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="border-b border-gray-200 p-4 font-medium">&nbsp;</th>
                    {TIME_BLOCKS.map((block) => (
                      <th key={block} className="border-b border-gray-200 p-4 font-medium text-center">
                        {block}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day, dayIdx) => (
                    <tr key={day.id}>
                      <td className="border-b border-gray-200 p-4 font-semibold text-center bg-gray-50">
                        Day {day.id}
                      </td>
                      {TIME_BLOCKS.map((block, blockIdx) => {
                        const isSelected = selectedCell?.dayIdx === dayIdx && selectedCell?.blockIdx === blockIdx;
                        const activities = day.blocks[blockIdx];
                        
                        return (
                          <td
                            key={block}
                            className={`border-b border-gray-200 p-4 cursor-pointer transition-colors min-w-[180px] min-h-[120px] align-top ${
                              isSelected 
                                ? 'bg-blue-100 border-blue-300' 
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => handleCellClick(dayIdx, blockIdx)}
                          >
                            <div className="space-y-2">
                              {activities.length > 0 ? (
                                activities.map((activity, activityIdx) => (
                                  <div 
                                    key={activity.id}
                                    className="p-2 bg-white rounded border border-gray-100 shadow-sm"
                                  >
                                    <div className="font-medium text-gray-900 text-xs truncate">
                                      {activity.title || `Activity ${activityIdx + 1}`}
                                    </div>
                                    {activity.description && (
                                      <div className="text-xs text-gray-500 mt-1 truncate">
                                        {activity.description}
                                      </div>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <div className="text-center py-4">
                                  <span className="text-gray-400 text-sm">Click to add activity</span>
                                </div>
                              )}
                              {activities.length > 0 && (
                                <div className="text-xs text-gray-400 text-center pt-1">
                                  +{activities.length} activit{activities.length === 1 ? 'y' : 'ies'}
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button type="button" variant="outline" onClick={handleAddDay}>
                Add day
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
