'use client'

import { BasicInfoForm } from './forms/BasicInfoForm'
import { TripInfoForm } from './forms/TripInfoForm'
import { GroupInfoForm } from './forms/GroupInfoForm'
import { CustomerFormData } from '../create/page'
import Card from '@/app/dashboard/_components/Card'

interface CustomerFormProps {
  formData: CustomerFormData
  updateFormData: (section: keyof CustomerFormData, data: CustomerFormData[keyof CustomerFormData]) => void
  currentSection: string
}

export function CustomerForm({ formData, updateFormData, currentSection }: CustomerFormProps) {
  return (
    <div className="max-h-[100vh] overflow-y-auto space-y-10 ">
      {/* Basic Info Section */}
      <div id="basic-info" className={` ${currentSection === 'basic-info' ? 'border-b-4 border-blue-500' : ''}`}>
      <Card className=" shadow-sm bg-white">
      <BasicInfoForm 
          data={formData.basicInfo}
          onChange={(data) => updateFormData('basicInfo', data)}
        />
      </Card>
      </div>
      
      {/* Trip Info Section */}
      <div id="trip-info" className={` ${currentSection === 'trip-info' ? 'border-l-4 border-blue-500' : ''}`}>
       <Card className=" shadow-sm bg-white">
       <TripInfoForm 
          data={formData.tripInfo}
          onChange={(data: CustomerFormData['tripInfo']) => updateFormData('tripInfo', data)}
        />
       </Card>
      </div>
      
      {/* Group Info Section */}
      <div id="group-info" className={` ${currentSection === 'group-info' ? 'border-b-4 border-blue-500' : ''}`}>
      <Card className='shadow-sm bg-white'>
      <GroupInfoForm 
          data={formData.groupInfo}
          onChange={(data: CustomerFormData['groupInfo']) => updateFormData('groupInfo', data)}
        />
      </Card>
      </div>
    </div>
  )
}