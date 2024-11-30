import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { LeftNavigation } from './_components/LeftNavigation'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "TraviTime",
    description: "One Place Desitination",
  };

export default function DashboardLayout({children}:{children:React.ReactNode}) {
  return (
    <ClerkProvider>
    <LeftNavigation>
        {children}
    </LeftNavigation>
  </ClerkProvider>
  )
}
