'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CustomerForm } from '../_components/CustomerForm'
import { CustomerSidebar } from '../_components/CustomerSidebar'
import { ReactiveReview } from '../_components/ReactiveReview'

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
      <div className="w-full bg-white border-b border-gray-200 px-10 py-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Create Customer</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="px-6 py-2 text-base">Close</Button>
          <Button className="px-6 py-2 text-base bg-blue-700 hover:bg-blue-800">Create Customer</Button>
        </div>
      </div>
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