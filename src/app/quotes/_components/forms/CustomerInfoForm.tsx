'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'

interface CustomerInfoData {
  selectCustomer: string
  firstName: string
  customerId: string
  emailId: string
  contactNumber: string
}

interface CustomerInfoFormProps {
  data: CustomerInfoData
  onChange: (data: CustomerInfoData) => void
}

export function CustomerInfoForm({ data, onChange }: CustomerInfoFormProps) {
  const handleInputChange = (field: keyof CustomerInfoData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  // Mock customer options - in real app this would come from API
  const customerOptions = [
    { value: 'john-doe', label: 'John Doe' },
    { value: 'jane-smith', label: 'Jane Smith' },
    { value: 'alex-johnson', label: 'Alex Johnson' },
  ]

  return (
    <div className="p-8">
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Info</h2>
        
        <div className="space-y-6">
          {/* Select Customer */}
          <div>
            <Label htmlFor="selectCustomer" className="text-sm font-medium text-gray-700">
              Select Customer
            </Label>
            <Select
              id="selectCustomer"
              value={data.selectCustomer}
              onChange={(e) => handleInputChange('selectCustomer', e.target.value)}
              className="mt-1"
            >
              <option value="">Select Customer</option>
              {customerOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {/* First Name */}
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
              First Name
            </Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="mt-1"
              placeholder="First Name"
            />
          </div>

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
              placeholder="CUST-0001"
              disabled
            />
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emailId" className="text-sm font-medium text-gray-700">
                Email ID
              </Label>
              <Input
                id="emailId"
                type="email"
                value={data.emailId}
                onChange={(e) => handleInputChange('emailId', e.target.value)}
                className="mt-1"
                placeholder="jj@domain.com"
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
                placeholder="+91 XXXXX 98XX"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 