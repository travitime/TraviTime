"use client";

import { useForm, useFieldArray } from "react-hook-form";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";

type FormData = {
  members: { name: string; email: string }[];
};

export default function FormTravellersList() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      members: [
        { name: "", email: "" },
        { name: "", email: "" },
        { name: "", email: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <h1>Travellers Info</h1>
      {fields.map((field, index) => (
        <div className="space-y-1">
          <div key={field.id} className="flex space-x-2">
            <div className="w-2/5">
              <label className="block text-sm font-medium">
                Member {index + 1} full name
              </label>
              <Input
                {...register(`members.${index}.name`)}
                placeholder="Member Name"
              />
            </div>
            <div className="w-2/5">
              <label className="block text-sm font-medium">
                Member {index + 1} email
              </label>
              <Input
                {...register(`members.${index}.email`)}
                placeholder="Email"
                type="email"
              />
            </div>
            <div className="w-1/5 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => remove(index)}
                className="w-full"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => append({ name: "", email: "" })}
      >
        Add Member
      </Button>

      {/* <Button type="submit">Submit</Button> */}
    </form>
  );
}
