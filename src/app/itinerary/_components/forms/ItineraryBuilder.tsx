"use client";

import React from "react";
import { Button } from "@/components/ui/button";

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

interface ItineraryBuilderProps {
  days: Day[];
  selectedCell: { dayIdx: number; blockIdx: number } | null;
  onCellClick: (dayIdx: number, blockIdx: number) => void;
  onAddDay: () => void;
}

export default function ItineraryBuilder({ 
  days, 
  selectedCell, 
  onCellClick, 
  onAddDay 
}: ItineraryBuilderProps) {
  return (
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
                    onClick={() => onCellClick(dayIdx, blockIdx)}
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
      
      <div className="mt-4 flex justify-end">
        <Button type="button" variant="outline" onClick={onAddDay}>
          Add day
        </Button>
      </div>
    </div>
  );
}
