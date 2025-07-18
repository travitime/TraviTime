'use client'

export function ReviewForm() {
  return (
    <div className="p-8">
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Review</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="text-center text-gray-500">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Review Summary</h3>
            <p className="text-sm">
              Complete all the previous sections to see a summary of the customer information here.
              Once you've filled in the Basic Info, Trip Info, and Group Info sections, 
              you'll be able to review all details before creating the customer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 