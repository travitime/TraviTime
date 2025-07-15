import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'

export default function CustomerPage() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Customer Management</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your customers and their travel requirements</p>
          </div>
          <Link href="/customer/create">
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Create Customer
            </Button>
          </Link>
        </div>

        {/* Content */}
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No customers yet</h3>
            <p className="text-sm mb-4">
              Get started by creating your first customer. You can manage their travel requirements,
              create quotes, and track their journey.
            </p>
            <Link href="/customer/create">
              <Button>
                <PlusIcon className="w-4 h-4 mr-2" />
                Create Your First Customer
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
} 