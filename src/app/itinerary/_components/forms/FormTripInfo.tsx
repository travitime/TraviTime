"use client";

import { useForm } from "react-hook-form";
import React from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
type FormData = {
  destinationCountry: string;
  cities: string;
  fromDate: Date;
  toDate: Date;
  travelType: string;
  category: string;
  notes: string;
};
export default function FormTripInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4 mt-6">
      <h1>Trip Info</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Destination Country
          </label>
          <Input {...register("destinationCountry")} placeholder="" />
        </div>

        <div>
          <label className="block text-sm font-medium">Cities/Places</label>
          <Input {...register("cities")} placeholder="" />
        </div>

        <div>
          <label className="block text-sm font-medium">From Date</label>
          <Input {...register("fromDate")} type="date" />
        </div>

        <div>
          <label className="block text-sm font-medium">To Date</label>
          <Input {...register("toDate")} type="date" />
        </div>

        <div>
          <label className="block text-sm font-medium">Travel Type</label>
          <Select {...register("travelType")}>
            <option value="Leisure">Leisure</option>
            <option value="Business">Business</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <Select {...register("category")}>
            <option value="Full board + flights">Full board + flights</option>
            <option value="Flights only">Flights only</option>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Notes</label>
          <Textarea
            {...register("notes")}
            placeholder="Additional information"
          />
        </div>

        {/* <Button type="submit">Proceed</Button> */}
      </div>
    </form>
  );
}
