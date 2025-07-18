'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface BasicInfoData {
  customerId: string
  firstName: string
  lastName: string
  email: string
  contactNumber: string
}

interface BasicInfoFormProps {
  data: BasicInfoData
  onChange: (data: BasicInfoData) => void
}

export function BasicInfoForm({ data, onChange }: BasicInfoFormProps) {
  const handleInputChange = (field: keyof BasicInfoData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Info</h2>
        
        <div className="space-y-6">
          {/* Customer ID */}
          <div>
            <Label htmlFor="customerId" className="text-sm font-medium text-gray-700">
              Customer ID
            </Label>
            <Input
              id="customerId"
              value={data.customerId}
              onChange={(e) => handleInputChange('customerId', e.target.value)}
              className="mt-1 bg-gray-50"
              disabled
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First Name
              </Label>
              <Input
                id="firstName"
                value={data.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="mt-1"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={data.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="mt-1"
                placeholder="Enter last name"
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1"
                placeholder="Enter email address"
                required
              />
            </div>
            <div>
              <Label htmlFor="contactNumber" className="text-sm font-medium text-gray-700">
                Contact Number
              </Label>
              <Input
                id="contactNumber"
                type="tel"
                value={data.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                className="mt-1"
                placeholder="Enter contact number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 