import React from "react";

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
