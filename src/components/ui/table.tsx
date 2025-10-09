import React, { useMemo } from "react";
import { useReactTable, flexRender, getCoreRowModel, ColumnDef } from "@tanstack/react-table";

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm text-left text-sm text-gray-800">
      {children}
    </table>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-gray-100 text-gray-600 text-xs font-semibold">
      {children}
    </thead>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
  );
}

export function TableRow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr
      className={`hover:bg-gray-50 odd:bg-gray-50 even:bg-white first:rounded-t-lg last:rounded-b-lg ${className}`}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <th className="px-6 py-4 font-medium text-gray-700">{children}</th>;
}

export function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="px-6 py-4 text-gray-900">{children}</td>;
}

// Generic reusable TanStackTable component
export function TanStackTable<TData>({
  columns,
  data,
  className = "",
}: {
  columns: ColumnDef<TData>[];
  data: TData[];
  className?: string;
}) {
  // Memoize columns and data for stable references
  const memoColumns = useMemo(() => columns, [columns]);
  const memoData = useMemo(() => data, [data]);

  const table = useReactTable({
    columns: memoColumns,
    data: memoData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className={`w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm text-left text-sm text-gray-800 ${className}`}>
      <thead className="bg-gray-100 text-gray-600 text-xs font-semibold">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan} className="px-6 py-4 font-medium text-gray-700">
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className="hover:bg-gray-50 odd:bg-gray-50 even:bg-white first:rounded-t-lg last:rounded-b-lg">
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="px-6 py-4 text-gray-900">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
