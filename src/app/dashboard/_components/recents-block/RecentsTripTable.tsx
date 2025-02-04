import React from "react";
import Image from "next/image";
import { Ellipsis } from "lucide-react";
import Card from "../Card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RecentsTripTable() {
  const trips = [
    {
      group: "Maris lego",
      destinations: "Madrid, Barcelona...",
      date: "Jun 24, 2024",
      budget: "$942.00",
      status: "Planning",
    },
    {
      group: "Natali Craig",
      destinations: "Himachal, India",
      date: "Mar 10, 2024",
      budget: "$881.00",
      status: "Completed",
    },
    {
      group: "Drew Cano",
      destinations: "Andaman Islands",
      date: "Nov 10, 2024",
      budget: "$409.00",
      status: "Cancelled",
    },
    {
      group: "Orlando Diggs",
      destinations: "USA",
      date: "Dec 20, 2024",
      budget: "$953.00",
      status: "Scheduled",
    },
    {
      group: "Andi Lane",
      destinations: "Australia",
      date: "Jul 25, 2024",
      budget: "$907.00",
      status: "Planning",
    },
  ];

  const statusStyles: any = {
    Planning: "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
    Scheduled: "bg-purple-100 text-purple-700",
  };

  return (
    <Card className="px-4">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Group Name</TableHead>
            <TableHead>Destinations</TableHead>
            <TableHead>Trip Start Date</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trips.map((trip, index) => (
            <TableRow key={index} className="border-b">
              <TableCell>{trip.group}</TableCell>
              <TableCell>{trip.destinations}</TableCell>
              <TableCell>{trip.date}</TableCell>
              <TableCell>{trip.budget}</TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusStyles[trip.status]
                  }`}
                >
                  {trip.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
