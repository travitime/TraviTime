"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const TIME_BLOCKS = ["Morning", "Noon", "Evening"];

interface ActivityCell {
  activity: string;
}

interface Day {
  id: number;
  blocks: ActivityCell[];
}

export default function ItineraryBuilder() {
  const [days, setDays] = useState<Day[]>([
    { id: 1, blocks: [{ activity: "" }, { activity: "" }, { activity: "" }] },
    { id: 2, blocks: [{ activity: "" }, { activity: "" }, { activity: "" }] },
  ]);
  const [editing, setEditing] = useState<{ dayIdx: number; blockIdx: number } | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleCellClick = (dayIdx: number, blockIdx: number) => {
    setEditing({ dayIdx, blockIdx });
    setInputValue(days[dayIdx].blocks[blockIdx].activity);
  };

  const handleSave = () => {
    if (editing) {
      const newDays = [...days];
      newDays[editing.dayIdx].blocks[editing.blockIdx].activity = inputValue;
      setDays(newDays);
      setEditing(null);
      setInputValue("");
    }
  };

  const handleAddDay = () => {
    setDays([
      ...days,
      { id: days.length + 1, blocks: [{ activity: "" }, { activity: "" }, { activity: "" }] },
    ]);
  };

  return (
    <div className="bg-white p-4 rounded-xl">
      <table className="w-full border border-collapse text-sm shadow rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-3 font-medium">&nbsp;</th>
            {TIME_BLOCKS.map((block) => (
              <th key={block} className="border p-3 font-medium text-center">{block}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, dayIdx) => (
            <tr key={day.id} className="even:bg-gray-50">
              <td className="border p-3 font-semibold text-center">Day {day.id}</td>
              {TIME_BLOCKS.map((block, blockIdx) => (
                <td
                  key={block}
                  className="border p-3 cursor-pointer hover:bg-indigo-50 text-center min-w-[120px]"
                  onClick={() => handleCellClick(dayIdx, blockIdx)}
                >
                  {day.blocks[blockIdx].activity || <span className="text-gray-300">&nbsp;</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <Button type="button" variant="outline" onClick={handleAddDay}>
          Add day
        </Button>
      </div>
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <div className="space-y-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter activity"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
