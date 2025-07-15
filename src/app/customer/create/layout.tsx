import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Customer - Travitime',
  description: 'Create a new customer for travel planning'
}

interface CreateCustomerLayoutProps {
  children: React.ReactNode
}

export default function CreateCustomerLayout({ children }: CreateCustomerLayoutProps) {
  return children
} 