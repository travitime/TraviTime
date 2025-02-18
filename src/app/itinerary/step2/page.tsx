"use client";
import React from "react";
import { JumpToSection } from "@/components/ui/jump-to-section";
import FormTravellersList from "../_components/forms/FormTravellersList";
import ItineraryBuilder from "../_components/forms/ItineraryBuilder";
import { CreateHeader } from "@/components/ui/create-header";
import { useRouter } from "next/navigation";
const sections = [
  { id: "section1", label: "Basic Info" },
  { id: "section2", label: "Trip Info" },
  { id: "section3", label: "Group Info" },
  { id: "section4", label: "Itinerary Info" },
];
export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className="w-full">
      <CreateHeader
        title="Create Itinerary"
        secondaryAction={{
          label: "Close",
          onClick: () => {
            router.push("/dashboard");
          },
        }}
        primaryAction={{
          label: "Save Itinerary",
          onClick: () => {
            router.push("/itinerary/list");
          },
        }}
      />
      <div className="grid grid-cols-12">
        <aside className="col-span-2">
          <JumpToSection sections={sections} />
        </aside>
        <div className="col-span-6">
          <FormTravellersList />
          <ItineraryBuilder />
        </div>
      </div>
    </div>
  );
}
