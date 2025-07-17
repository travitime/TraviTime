import FullWidthLayout from '@/components/layouts/FullWidthLayout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

// Mock data for customers
const mockCustomers = [
  {
    groupLeader: 'Jon Snow',
    tripStatus: 'Enquiry',
    members: 6,
    destination: 'Amsterdam, Berlin, Milan',
    quoteStatus: 'To do',
    completedTrips: '-',
    customerValue: '-',
  },
  // Add more mock customers as needed
];

export default function CustomerPage() {
  return (
    <FullWidthLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">1 Customer</h1>
          <Link href="/customer/create">
            <Button className="bg-primary text-white">Create Customer</Button>
          </Link>
        </div>
        {/* Banner */}
        <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-6 flex items-center justify-between mb-6">
          <div className="flex items-center">
            <span className="text-2xl mr-4">🎉</span>
            <div>
              <div className="font-medium text-gray-800 mb-1">You are on a roll!</div>
              <div className="text-gray-700 text-sm">Let's send this customer a quote they cannot refuse!</div>
            </div>
          </div>
          <Button className="bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300">Create Quote</Button>
        </div>
        {/* Customer Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Leader Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.of Members</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active trip destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed Trips</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Value</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCustomers.map((customer, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.groupLeader}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">{customer.tripStatus}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.members}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">{customer.quoteStatus}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.completedTrips}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.customerValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700">...</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </FullWidthLayout>
  );
} 