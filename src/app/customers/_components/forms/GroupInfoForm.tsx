'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusIcon } from 'lucide-react'

interface Member {
  id: string
  fullName: string
  emailId: string
}

interface SubGroup {
  id: string
  name: string
  members: Member[]
}

interface GroupInfoData {
  subGroups: SubGroup[]
}

interface GroupInfoFormProps {
  data: GroupInfoData
  onChange: (data: GroupInfoData) => void
}

export function GroupInfoForm({ data, onChange }: GroupInfoFormProps) {
  const addMember = (subGroupId: string) => {
    const updatedSubGroups = data.subGroups.map(group => {
      if (group.id === subGroupId) {
        const newMember: Member = {
          id: `member-${Date.now()}`,
          fullName: '',
          emailId: ''
        }
        return { ...group, members: [...group.members, newMember] }
      }
      return group
    })
    onChange({ subGroups: updatedSubGroups })
  }

  const addSubGroup = () => {
    const newSubGroup: SubGroup = {
      id: `sub-group-${Date.now()}`,
      name: `Sub group ${data.subGroups.length + 1}`,
      members: [
        { id: `member-${Date.now()}`, fullName: '', emailId: '' }
      ]
    }
    onChange({ subGroups: [...data.subGroups, newSubGroup] })
  }

  const updateMember = (subGroupId: string, memberId: string, field: keyof Member, value: string) => {
    const updatedSubGroups = data.subGroups.map(group => {
      if (group.id === subGroupId) {
        return {
          ...group,
          members: group.members.map(member => 
            member.id === memberId ? { ...member, [field]: value } : member
          )
        }
      }
      return group
    })
    onChange({ subGroups: updatedSubGroups })
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Group Info</h2>
        
        <div className="space-y-8">
          {data.subGroups.map((subGroup) => (
            <div key={subGroup.id} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">{subGroup.name}</h3>
              
              <div className="space-y-4">
                {subGroup.members.map((member, memberIndex) => (
                  <div key={member.id} className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`${member.id}-fullName`} className="text-sm font-medium text-gray-700">
                        Member {memberIndex + 1} Full Name
                      </Label>
                      <Input
                        id={`${member.id}-fullName`}
                        value={member.fullName}
                        onChange={(e) => updateMember(subGroup.id, member.id, 'fullName', e.target.value)}
                        className="mt-1"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${member.id}-emailId`} className="text-sm font-medium text-gray-700">
                        Member {memberIndex + 1} Email ID
                      </Label>
                      <Input
                        id={`${member.id}-emailId`}
                        type="email"
                        value={member.emailId}
                        onChange={(e) => updateMember(subGroup.id, member.id, 'emailId', e.target.value)}
                        className="mt-1"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                ))}
                
                {/* Add Member Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addMember(subGroup.id)}
                  className="w-auto text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </div>
            </div>
          ))}
          
          {/* Add Sub Group Button */}
          <Button
            type="button"
            variant="outline"
            onClick={addSubGroup}
            className="w-auto text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Sub Group
          </Button>
        </div>
      </div>
    </div>
  )
}