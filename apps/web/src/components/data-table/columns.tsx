"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import type { Ping } from "@openstatus/tinybird";
import { regionsDict } from "@openstatus/utils";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableStatusBadge } from "./data-table-status-badge";

export const columns: ColumnDef<Ping>[] = [
  {
    accessorKey: "cronTimestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {format(new Date(row.getValue("cronTimestamp")), "LLL dd, y HH:mm")}
        </div>
      );
    },
  },
  {
    accessorKey: "statusCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const statusCode = String(row.getValue("statusCode"));
      return <DataTableStatusBadge {...{ statusCode }} />;
    },
    filterFn: (row, id, value) => {
      // get the first digit of the status code
      return value.includes(Number(String(row.getValue(id)).charAt(0)));
    },
  },
  {
    accessorKey: "latency",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Latency (ms)" />
    ),
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <span className="font-mono">{String(row.getValue("region"))} </span>
          <span className="text-muted-foreground text-xs">
            {regionsDict[row.original.region]?.location}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
