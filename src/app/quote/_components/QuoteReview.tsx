'use client'

// Import interface from the create page
import type { QuoteFormData } from '../create/page'

interface QuoteReviewProps {
  formData: QuoteFormData
}

export function QuoteReview({ formData }: QuoteReviewProps) {
  const { customerInfo, itineraryEstimate } = formData

  const hasCustomerInfo = customerInfo.selectCustomer || customerInfo.firstName || customerInfo.emailId
  const hasItineraryEstimate = itineraryEstimate.itinerary || itineraryEstimate.accommodation.length > 0

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Review</h3>
      
      <div className="space-y-6">
        {/* Customer Info Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Customer Information</h4>
          {hasCustomerInfo ? (
            <div className="space-y-2 text-sm">
              {customerInfo.selectCustomer && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium">{customerInfo.selectCustomer}</span>
                </div>
              )}
              {customerInfo.firstName && (
                <div className="flex justify-between">
                  <span className="text-gray-600">First Name:</span>
                  <span className="font-medium">{customerInfo.firstName}</span>
                </div>
              )}
              {customerInfo.customerId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer ID:</span>
                  <span className="font-medium">{customerInfo.customerId}</span>
                </div>
              )}
              {customerInfo.emailId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{customerInfo.emailId}</span>
                </div>
              )}
              {customerInfo.contactNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact:</span>
                  <span className="font-medium">{customerInfo.contactNumber}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No customer information entered yet</p>
          )}
        </div>

        {/* Itinerary & Estimate Section */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Itinerary & Estimate</h4>
          {hasItineraryEstimate ? (
            <div className="space-y-3 text-sm">
              {itineraryEstimate.itinerary && (
                <div>
                  <span className="text-gray-600">Itinerary:</span>
                  <p className="font-medium text-xs mt-1">{itineraryEstimate.itinerary}</p>
                </div>
              )}
              
              {/* Accommodation Summary */}
              {itineraryEstimate.accommodation.length > 0 && (
                <div>
                  <span className="text-gray-600">Accommodation:</span>
                  <div className="mt-1 space-y-1">
                    {itineraryEstimate.accommodation.map((day, index) => (
                      day.type && (
                        <div key={day.id} className="text-xs bg-gray-50 p-2 rounded">
                          <span className="font-medium">{day.day}:</span> {day.type}
                          {day.addCompliment && <span className="text-blue-600 ml-1">(with compliment)</span>}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Food Summary */}
              {itineraryEstimate.food.length > 0 && (
                <div>
                  <span className="text-gray-600">Food Options:</span>
                  <div className="mt-1 space-y-1">
                    {itineraryEstimate.food.map((food, index) => (
                      food.included && (
                        <div key={food.id} className="text-xs bg-gray-50 p-2 rounded">
                          <span className="font-medium">{food.name}:</span> {food.included}
                          {food.addCompliment && <span className="text-blue-600 ml-1">(with compliment)</span>}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {itineraryEstimate.lunch && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Lunch:</span>
                  <span className="font-medium">{itineraryEstimate.lunch}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No itinerary information entered yet</p>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 pt-4 border-t">
        <div className="text-xs text-gray-500 mb-2">Form Completion</div>
        <div className="flex space-x-1">
          <div className={`h-2 w-full rounded ${hasCustomerInfo ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
          <div className={`h-2 w-full rounded ${hasItineraryEstimate ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {[hasCustomerInfo, hasItineraryEstimate].filter(Boolean).length} of 2 sections completed
        </div>
      </div>
    </div>
  )
} 