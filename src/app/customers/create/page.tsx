'use client'

import { useState } from 'react'
import { CreateHeader } from '@/components/ui/create-header'
import { Card } from '@/components/ui/card'
import { CustomerForm } from '../_components/CustomerForm'
import { CustomerSidebar } from '../_components/CustomerSidebar'
import { ReactiveReview } from '../_components/ReactiveReview'
import { useRouter } from 'next/navigation'

// Shared form data interface
export interface CustomerFormData {
  basicInfo: {
    customerId: string
    firstName: string
    lastName: string
    email: string
    contactNumber: string
  }
  tripInfo: {
    destinationCountry: string
    destinationCities: string
    fromDate: string
    endDate: string
    travelType: string
    category: string
    groupSize: string
    notes: string
    itinerary: string
  }
  groupInfo: {
    subGroups: Array<{
      id: string
      name: string
      members: Array<{
        id: string
        fullName: string
        emailId: string
      }>
    }>
  }
}

export default function CreateCustomerPage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState('basic-info')
  const [formData, setFormData] = useState<CustomerFormData>({
    basicInfo: {
      customerId: 'CUST-0001',
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: ''
    },
    tripInfo: {
      destinationCountry: '',
      destinationCities: '',
      fromDate: '',
      endDate: '',
      travelType: 'Leisure',
      category: 'Flights + Accommodation',
      groupSize: '',
      notes: '',
      itinerary: ''
    },
    groupInfo: {
      subGroups: [
        {
          id: 'sub-group-1',
          name: 'Sub group 1',
          members: [
            { id: 'member-1', fullName: '', emailId: '' },
            { id: 'member-2', fullName: '', emailId: '' },
            { id: 'member-3', fullName: '', emailId: '' }
          ]
        }
      ]
    }
  })

  const updateFormData = (section: keyof CustomerFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-width header */}
      <CreateHeader
        title="Create Customer"
        primaryAction={{ label: 'Create Customer', onClick: () => {} }}
        secondaryAction={{ label: 'Close', onClick: () => {
          router.push("/customers");
        } }}
      />
      <div className="flex">
        {/* Sidebar Navigation */}
        <CustomerSidebar
          currentStep={currentSection}
          onStepChange={setCurrentSection}
        />
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Two Column Layout: Forms + Review */}
            <div className="grid grid-cols-3 gap-6">
              {/* Forms Section */}
              <div className="col-span-2">

                  <CustomerForm
                    formData={formData}
                    updateFormData={updateFormData}
                    currentSection={currentSection}
                  />

              </div>
              {/* Review Section */}
              <div className="col-span-1">
                <Card className=" shadow-sm sticky top-6">
                  <ReactiveReview formData={formData} />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 