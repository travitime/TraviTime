"use client";
import React from "react";
import FormBasicInfo from "../_components/forms/FormBasicInfo";
import FormTripInfo from "../_components/forms/FormTripInfo";
import { JumpToSection } from "@/components/ui/jump-to-section";
import { CreateHeader } from "@/components/ui/create-header";
import { useRouter } from "next/navigation";
const sections = [
  { id: "section1", label: "Basic Info" },
  { id: "section2", label: "Trip Info" },
  { id: "section3", label: "Group Info" },
  { id: "section4", label: "Itinerary Info" },
];

export default function ItineraryStepOnePage() {
  const router = useRouter();
  return (
    <div className="w-full ">
      <CreateHeader
        title="Create Itinerary"
        secondaryAction={{
          label: "Close",
          onClick: () => {
            router.push("/dashboard");
          },
        }}
        primaryAction={{
          label: "Proceed",
          onClick: () => {
            router.push("/itinerary/step2");
          },
        }}
      />
      <div className="grid grid-cols-12">
        <aside className="col-span-2">
          <JumpToSection sections={sections} />
        </aside>
        <div className="col-span-6">
          <FormBasicInfo />
          <FormTripInfo />
        </div>
      </div>
    </div>
  );
}
