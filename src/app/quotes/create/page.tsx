'use client'

import { useState } from 'react'
import { CreateHeader } from '@/components/ui/create-header'
import { Card } from '@/components/ui/card'
import { QuoteForm } from '../_components/QuoteForm'
import { QuoteSidebar } from '../_components/QuoteSidebar'
import { QuoteReview } from '../_components/QuoteReview'

// Shared form data interface
export interface QuoteFormData {
  customerInfo: {
    selectCustomer: string
    firstName: string
    customerId: string
    emailId: string
    contactNumber: string
  }
  itineraryEstimate: {
    itinerary: string
    accommodation: Array<{
      id: string
      day: string
      type: string
      addCompliment: boolean
    }>
    food: Array<{
      id: string
      name: string
      included: string
      addCompliment: boolean
    }>
    lunch: string
  }
}

export default function CreateQuotePage() {
  const [currentSection, setCurrentSection] = useState('customer-info')
  
  // Initialize form data with default values
  const [formData, setFormData] = useState<QuoteFormData>({
    customerInfo: {
      selectCustomer: '',
      firstName: '',
      customerId: 'CUST-0001',
      emailId: '',
      contactNumber: ''
    },
    itineraryEstimate: {
      itinerary: '',
      accommodation: [
        { id: '1', day: 'Day 1', type: '', addCompliment: false },
        { id: '2', day: 'Day 2', type: '', addCompliment: false },
        { id: '3', day: 'Day 3', type: '', addCompliment: false },
        { id: '4', day: 'Day 4', type: '', addCompliment: false },
        { id: '5', day: 'Day 5', type: '', addCompliment: false },
        { id: '6', day: 'Day 6', type: '', addCompliment: false },
        { id: '7', day: 'Day 7', type: '', addCompliment: false }
      ],
      food: [
        { id: '1', name: 'Breakfast', included: '', addCompliment: false },
        { id: '2', name: 'Lunch', included: '', addCompliment: false },
        { id: '3', name: 'Dinner', included: '', addCompliment: false },
        { id: '4', name: 'Dinner', included: '', addCompliment: false },
        { id: '5', name: 'Exceptions', included: '', addCompliment: false },
        { id: '6', name: 'Dinner', included: '', addCompliment: false }
      ],
      lunch: ''
    }
  })

  const updateFormData = (section: keyof QuoteFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-width header */}
      <CreateHeader
        title="Create Quote"
        primaryAction={{ label: 'Create Quote', onClick: () => {} }}
        secondaryAction={{ label: 'Close', onClick: () => {} }}
      />
      <div className="flex">
        {/* Sidebar Navigation */}
        <QuoteSidebar 
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
                <QuoteForm 
                  formData={formData}
                  updateFormData={updateFormData}
                  currentSection={currentSection}
                />
              </div>
              {/* Review Section */}
              <div className="col-span-1">
                <Card className="shadow-sm sticky top-6">
                  <QuoteReview formData={formData} />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 