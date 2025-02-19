"use client";

import { useForm } from "react-hook-form";
import React from "react";
import { Input } from "@/components/ui/input";
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  groupSize: number;
};

export default function FormBasicInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
      <h1>Basic Info</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <Input
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <Input
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Group Size</label>
        <Input
          type="number"
          {...register("groupSize", {
            required: "Group size is required",
            min: { value: 1, message: "Must be at least 1" },
          })}
        />
        {errors.groupSize && (
          <p className="text-red-500 text-sm">{errors.groupSize.message}</p>
        )}
      </div>

      {/* <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button> */}
    </form>
  );
}
