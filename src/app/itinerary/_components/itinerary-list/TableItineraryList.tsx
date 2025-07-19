import React, { useMemo } from "react";
import Card from "../../../dashboard/_components/Card";
import { TanStackTable } from "@/components/ui/table";
import { Cell } from "@tanstack/react-table";

export default function TableItineraryList() {
  const data = [
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

  const columns = useMemo(
    () => [
      {
        header: "Group Name",
        accessorKey: "group",
      },
      {
        header: "Destinations",
        accessorKey: "destinations",
      },
      {
        header: "Trip Start Date",
        accessorKey: "date",
      },
      {
        header: "Budget",
        accessorKey: "budget",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ cell }: { cell: Cell<any, unknown> }) => (
          <span className="px-3 py-1 rounded-full text-sm font-medium">
            {String(cell.getValue())}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <Card className="px-4">
      <TanStackTable columns={columns} data={data} />
    </Card>
  );
}
