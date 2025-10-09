import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customer Management - Travitime',
  description: 'Manage customers and their travel requirements'
}

interface CustomerLayoutProps {
  children: React.ReactNode
}

export default function CustomerLayout({ children }: CustomerLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
} 