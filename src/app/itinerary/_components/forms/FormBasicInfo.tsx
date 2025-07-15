"use client";

import { useForm } from "react-hook-form";
import React from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const TAG_OPTIONS = ["Leisure", "Kids friendly", "Adventure", "Business", "Romantic"];

type FormData = {
  itineraryName: string;
  itineraryId: string;
  destinationCities: string;
  destinationCountries: string;
  tags: string[];
  numDays: number;
};

export default function FormBasicInfo() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      tags: [],
    },
  });

  const tags = watch("tags");

  const onTagToggle = (tag: string) => {
    if (tags.includes(tag)) {
      setValue(
        "tags",
        tags.filter((t) => t !== tag)
      );
    } else {
      setValue("tags", [...tags, tag]);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Itinerary Name</label>
          <Input {...register("itineraryName", { required: "Required" })} placeholder="10 days Leisure Trip Europe - AMS, PSG, BER" />
          {errors.itineraryName && <p className="text-red-500 text-sm">{errors.itineraryName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Itinerary ID</label>
          <Input {...register("itineraryId", { required: "Required" })} placeholder="it-0001" />
          {errors.itineraryId && <p className="text-red-500 text-sm">{errors.itineraryId.message}</p>}
        </div>
        <div></div>
        <div>
          <label className="block text-sm font-medium mb-1">Destination Cities/Places</label>
          <Input {...register("destinationCities", { required: "Required" })} placeholder="" />
          {errors.destinationCities && <p className="text-red-500 text-sm">{errors.destinationCities.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Destination Countries</label>
          <Input {...register("destinationCountries", { required: "Required" })} placeholder="" />
          {errors.destinationCountries && <p className="text-red-500 text-sm">{errors.destinationCountries.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {TAG_OPTIONS.map((tag) => (
              <button
                type="button"
                key={tag}
                className={`px-3 py-1 rounded-full border text-xs ${tags.includes(tag) ? "bg-indigo-100 border-indigo-400 text-indigo-700" : "bg-white border-gray-300 text-gray-600"}`}
                onClick={() => onTagToggle(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">No. of days <span className="text-gray-400 ml-1">&#9432;</span></label>
          <Input type="number" min={1} {...register("numDays", { required: "Required", min: 1 })} placeholder="2" />
          {errors.numDays && <p className="text-red-500 text-sm">{errors.numDays.message}</p>}
        </div>
      </div>
    </form>
  );
}
