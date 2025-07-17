'use client'

import { CustomerInfoForm } from './forms/CustomerInfoForm'
import { ItineraryEstimateForm } from './forms/ItineraryEstimateForm'
import Card from '@/app/dashboard/_components/Card'

// Import interface from the create page
import type { QuoteFormData } from '../create/page'

interface QuoteFormProps {
  formData: QuoteFormData
  updateFormData: (section: keyof QuoteFormData, data: any) => void
  currentSection: string
}

export function QuoteForm({ formData, updateFormData, currentSection }: QuoteFormProps) {
  return (
    <div className="max-h-[100vh] overflow-y-auto space-y-10">
      {/* Customer Info Section */}
      <div id="customer-info" className={` ${currentSection === 'customer-info' ? 'border-b-4 border-blue-500' : ''}`}>
        <Card className="shadow-sm bg-white">
          <CustomerInfoForm 
            data={formData.customerInfo}
            onChange={(data) => updateFormData('customerInfo', data)}
          />
        </Card>
      </div>
      
      {/* Itinerary and Estimate Section */}
      <div id="itinerary-estimate" className={` ${currentSection === 'itinerary-estimate' ? 'border-l-4 border-blue-500' : ''}`}>
        <Card className="shadow-sm bg-white">
          <ItineraryEstimateForm 
            data={formData.itineraryEstimate}
            onChange={(data: QuoteFormData['itineraryEstimate']) => updateFormData('itineraryEstimate', data)}
          />
        </Card>
      </div>
    </div>
  )
} 