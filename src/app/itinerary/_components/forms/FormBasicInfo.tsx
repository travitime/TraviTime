"use client";

import { useForm, Controller } from "react-hook-form";
import React from "react";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";

const TAG_OPTIONS = [
  { value: "Leisure", label: "Leisure" },
  { value: "Kids friendly", label: "Kids friendly" },
  { value: "Adventure", label: "Adventure" },
  { value: "Business", label: "Business" },
  { value: "Romantic", label: "Romantic" },
];

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
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      tags: [],
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6 max-w-xl">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">
            Itinerary Name
          </label>
          <Input
            {...register("itineraryName", { required: "Required" })}
            placeholder="10 days Leisure Trip Europe - AMS, PSG, BER"
          />
          {errors.itineraryName && (
            <p className="text-red-500 text-sm">
              {errors.itineraryName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Itinerary ID</label>
          <Input
            {...register("itineraryId", { required: "Required" })}
            placeholder="it-0001"
          />
          {errors.itineraryId && (
            <p className="text-red-500 text-sm">
              {errors.itineraryId.message}
            </p>
          )}
        </div>
        <div></div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Destination Cities/Places
          </label>
          <Input
            {...register("destinationCities", { required: "Required" })}
            placeholder=""
          />
          {errors.destinationCities && (
            <p className="text-red-500 text-sm">
              {errors.destinationCities.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Destination Countries
          </label>
          <Input
            {...register("destinationCountries", { required: "Required" })}
            placeholder=""
          />
          {errors.destinationCountries && (
            <p className="text-red-500 text-sm">
              {errors.destinationCountries.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <Controller
            control={control}
            name="tags"
            render={({ field }) => (
              <MultiSelect
                options={TAG_OPTIONS}
                onValueChange={field.onChange}
                defaultValue={field.value}
                placeholder="Select tags..."
                variant="secondary"
              />
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            No. of days <span className="text-gray-400 ml-1">&#9432;</span>
          </label>
          <Input
            type="number"
            min={1}
            {...register("numDays", { required: "Required", min: 1 })}
            placeholder="2"
          />
          {errors.numDays && (
            <p className="text-red-500 text-sm">{errors.numDays.message}</p>
          )}
        </div>
      </div>
    </form>
  );
}
