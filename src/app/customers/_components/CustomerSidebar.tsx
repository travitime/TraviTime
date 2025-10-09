'use client'

import { cn } from '@/lib/utils'

interface CustomerSidebarProps {
  currentStep: string
  onStepChange: (step: string) => void
}

const steps = [
  { id: 'basic-info', label: 'Basic Info' },
  { id: 'trip-info', label: 'Trip Info' },
  { id: 'group-info', label: 'Group Info' }
]

export function CustomerSidebar({ currentStep, onStepChange }: CustomerSidebarProps) {
  const handleStepClick = (stepId: string) => {
    onStepChange(stepId)
    // Scroll to the section
    const element = document.getElementById(stepId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200">
      <div className="p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">On this page:</h3>
        <nav className="space-y-2">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              className={cn(
                'w-full text-left px-3 py-2 text-sm rounded-md transition-colors',
                currentStep === step.id
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              )}
            >
              {step.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
} 