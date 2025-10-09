'use client'

import { CustomerFormData } from '../create/page'

interface ReactiveReviewProps {
  formData: CustomerFormData
}

export function ReactiveReview({ formData }: ReactiveReviewProps) {
  const { basicInfo, tripInfo, groupInfo } = formData

  const hasBasicInfo = basicInfo.firstName || basicInfo.lastName || basicInfo.email
  const hasTripInfo = tripInfo.destinationCountry || tripInfo.fromDate || tripInfo.endDate
  const hasGroupInfo = groupInfo.subGroups.some(group => 
    group.members.some(member => member.fullName || member.emailId)
  )

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Review</h3>
      
      <div className="space-y-6">
        {/* Basic Info Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Basic Information</h4>
          {hasBasicInfo ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Customer ID:</span>
                <span className="font-medium">{basicInfo.customerId}</span>
              </div>
              {(basicInfo.firstName || basicInfo.lastName) && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{`${basicInfo.firstName} ${basicInfo.lastName}`.trim()}</span>
                </div>
              )}
              {basicInfo.email && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{basicInfo.email}</span>
                </div>
              )}
              {basicInfo.contactNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact:</span>
                  <span className="font-medium">{basicInfo.contactNumber}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No basic information entered yet</p>
          )}
        </div>

        {/* Trip Info Section */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Trip Information</h4>
          {hasTripInfo ? (
            <div className="space-y-2 text-sm">
              {tripInfo.destinationCountry && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Destination:</span>
                  <span className="font-medium">{tripInfo.destinationCountry}</span>
                </div>
              )}
              {tripInfo.destinationCities && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Cities:</span>
                  <span className="font-medium">{tripInfo.destinationCities}</span>
                </div>
              )}
              {(tripInfo.fromDate || tripInfo.endDate) && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Dates:</span>
                  <span className="font-medium">
                    {tripInfo.fromDate ? new Date(tripInfo.fromDate).toLocaleDateString() : '...'} - {tripInfo.endDate ? new Date(tripInfo.endDate).toLocaleDateString() : '...'}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Travel Type:</span>
                <span className="font-medium">{tripInfo.travelType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{tripInfo.category}</span>
              </div>
              {tripInfo.groupSize && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Group Size:</span>
                  <span className="font-medium">{tripInfo.groupSize}</span>
                </div>
              )}
              {tripInfo.itinerary && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Itinerary:</span>
                  <span className="font-medium">{tripInfo.itinerary}</span>
                </div>
              )}
              {tripInfo.notes && (
                <div>
                  <span className="text-gray-600">Notes:</span>
                  <p className="font-medium mt-1 text-xs">{tripInfo.notes}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No trip information entered yet</p>
          )}
        </div>

        {/* Group Info Section */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Group Information</h4>
          {hasGroupInfo ? (
            <div className="space-y-3">
              {groupInfo.subGroups.map((subGroup) => {
                const hasMembers = subGroup.members.some(member => member.fullName || member.emailId)
                if (!hasMembers) return null
                
                return (
                  <div key={subGroup.id} className="border border-gray-200 rounded p-3">
                    <h5 className="text-xs font-medium text-gray-700 mb-2">{subGroup.name}</h5>
                    <div className="space-y-1">
                      {subGroup.members.map((member) => {
                        if (!member.fullName && !member.emailId) return null
                        return (
                          <div key={member.id} className="text-xs">
                            <div className="font-medium">{member.fullName || 'No name'}</div>
                            {member.emailId && (
                              <div className="text-gray-500">{member.emailId}</div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No group information entered yet</p>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 pt-4 border-t">
        <div className="text-xs text-gray-500 mb-2">Form Completion</div>
        <div className="flex space-x-1">
          <div className={`h-2 w-full rounded ${hasBasicInfo ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
          <div className={`h-2 w-full rounded ${hasTripInfo ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
          <div className={`h-2 w-full rounded ${hasGroupInfo ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {[hasBasicInfo, hasTripInfo, hasGroupInfo].filter(Boolean).length} of 3 sections completed
        </div>
      </div>
    </div>
  )
}