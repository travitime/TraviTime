"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

const timeSlots: string[] = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00",
];
const days: string[] = Array.from({ length: 5 }, (_, i) => `Day ${i + 1}`);
const activityTypes: string[] = [
  "Flight",
  "Hotel Check-in",
  "Local Transport",
  "Sightseeing",
  "Dining",
  "Leisure",
  "Other",
];

type ItineraryData = {
  title: string;
  fromTime: string;
  toTime: string;
  activityType: string;
  notes?: string;
};

type SelectedCell = {
  day: string;
  fromTime: string;
} | null;

export default function ItineraryBuilder() {
  const [selectedCell, setSelectedCell] = useState<SelectedCell>(null);
  const [itinerary, setItinerary] = useState<Record<string, ItineraryData>>({});
  const [places, setPlaces] = useState<Record<string, string>>({});
  const { register, handleSubmit, reset, setValue } = useForm<ItineraryData>();

  const openModal = (day: string, time: string) => {
    const existingEntry = Object.entries(itinerary).find(([key, _]) =>
      key.startsWith(`${day}-${time}`)
    );
    if (existingEntry) {
      const [_, data] = existingEntry;
      setValue("title", data.title);
      setValue("fromTime", data.fromTime);
      setValue("toTime", data.toTime);
      setValue("activityType", data.activityType);
      setValue("notes", data.notes || "");
    } else {
      reset({ fromTime: time });
    }
    setSelectedCell({ day, fromTime: time });
  };

  const onSubmit = (data: ItineraryData) => {
    if (!selectedCell) return;
    setItinerary((prev) => ({
      ...prev,
      [`${selectedCell.day}-${data.fromTime}-${data.toTime}`]: data,
    }));
    setSelectedCell(null);
    reset();
  };

  const deleteActivity = () => {
    if (!selectedCell) return;
    setItinerary((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (key.startsWith(`${selectedCell.day}-${selectedCell.fromTime}`)) {
          delete updated[key];
        }
      });
      return updated;
    });
    setSelectedCell(null);
    reset();
  };

  return (
    <div className="p-4 bg-white ">
      <h1>Itinerary Builder</h1>
      <table className="mt-4 w-full border border-collapse text-sm shadow-lg rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-3">Day</th>
            {/* <th className="border p-3">Places to Visit</th> */}
            {timeSlots.map((time) => (
              <th key={time} className="border p-3">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day} className="even:bg-gray-50">
              <td className="border p-3 font-bold bg-gray-100">{day}</td>
              {/* <td className="border p-3">
                <Input
                  value={places[day] || ""}
                  onChange={(e) =>
                    setPlaces({ ...places, [day]: e.target.value })
                  }
                  placeholder="Enter places to visit"
                />
              </td> */}
              {timeSlots.map((time, index) => {
                const entry = Object.entries(itinerary).find(([key, _]) => {
                  const [entryDay, from, to] = key.split("-");
                  return entryDay === day && time >= from && time < to;
                });

                if (entry) {
                  const [_, { title, fromTime, toTime }] = entry;
                  if (time === fromTime) {
                    const colSpan =
                      timeSlots.indexOf(toTime) - timeSlots.indexOf(fromTime);
                    return (
                      <td
                        key={time}
                        className="border p-3 bg-blue-200 text-center cursor-pointer"
                        colSpan={colSpan > 0 ? colSpan : 1}
                        onClick={() => openModal(day, fromTime)}
                      >
                        {title}
                      </td>
                    );
                  }
                  return null;
                }
                return (
                  <td
                    key={time}
                    className="border p-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => openModal(day, time)}
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog
        open={!!selectedCell}
        onOpenChange={(open) => !open && setSelectedCell(null)}
      >
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register("title")} placeholder="Title" required />
            <Input
              {...register("fromTime")}
              defaultValue={selectedCell?.fromTime}
              readOnly
            />
            <Input {...register("toTime")} placeholder="To Time" required />
            <Select {...register("activityType")} required>
              {activityTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
            <Textarea {...register("notes")} placeholder="Notes" />
            <div className="flex justify-between">
              <Button
                type="button"
                variant="destructive"
                onClick={deleteActivity}
              >
                Delete
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
