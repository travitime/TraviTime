"use client";
import React from "react";
import TableItineraryList from "../_components/itinerary-list/TableItineraryList";
import Card from "../../dashboard/_components/Card";
import { CreateHeader } from "@/components/ui/create-header";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className='w-full "'>
      <CreateHeader
        title="5 Itineraries"
        
        primaryAction={{
          label: "Create",
          onClick: () => {
            router.push("/itinerary/create");
          },
        }}
      />
      <div className="grid grid-cols-12 gap-6 px-3 py-3  h-full">
        <div className="col-span-12  rounded-xl flex flex-col gap-6 py-3">
          <div className="w-full ">
            <Card bg="bg-white" padding="" className="py-4">
              <TableItineraryList />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
