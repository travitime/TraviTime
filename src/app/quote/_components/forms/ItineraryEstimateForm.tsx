'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'

interface AccommodationDay {
  id: string
  day: string
  type: string
  addCompliment: boolean
}

interface FoodOption {
  id: string
  name: string
  included: string
  addCompliment: boolean
}

interface ItineraryEstimateData {
  itinerary: string
  accommodation: AccommodationDay[]
  food: FoodOption[]
  lunch: string
}

interface ItineraryEstimateFormProps {
  data: ItineraryEstimateData
  onChange: (data: ItineraryEstimateData) => void
}

export function ItineraryEstimateForm({ data, onChange }: ItineraryEstimateFormProps) {
  const handleInputChange = (field: keyof ItineraryEstimateData, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const handleAccommodationChange = (index: number, field: keyof AccommodationDay, value: any) => {
    const updatedAccommodation = [...data.accommodation]
    updatedAccommodation[index] = { ...updatedAccommodation[index], [field]: value }
    handleInputChange('accommodation', updatedAccommodation)
  }

  const handleFoodChange = (index: number, field: keyof FoodOption, value: any) => {
    const updatedFood = [...data.food]
    updatedFood[index] = { ...updatedFood[index], [field]: value }
    handleInputChange('food', updatedFood)
  }

  // Mock itinerary options
  const itineraryOptions = [
    { value: 'paris-london-milan', label: '10 Days Leisure Trip Europe - PAR, LON, MIL' },
    { value: 'tokyo-osaka', label: '7 Days Japan Adventure - TOK, OSA' },
    { value: 'new-york-la', label: '5 Days USA Coast to Coast - NYC, LA' },
  ]

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Itinerary and Estimate</h2>
        
        <div className="space-y-8">
          {/* Itinerary Selection */}
          <div>
            <Label htmlFor="itinerary" className="text-sm font-medium text-gray-700">
              Itinerary
            </Label>
            <Select
              id="itinerary"
              value={data.itinerary}
              onChange={(e) => handleInputChange('itinerary', e.target.value)}
              className="mt-1"
            >
              <option value="">10 Days Leisure Trip Europe - PAR, LON, MIL</option>
              {itineraryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Accommodation Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Accommodation</h3>
            <div className="space-y-4">
              {data.accommodation.map((day, index) => (
                <div key={day.id} className="grid grid-cols-4 gap-4 items-end">
                  <div>
                    <Label htmlFor={`day-${index}`} className="text-sm font-medium text-gray-700">
                      {day.day}
                    </Label>
                    <Select
                      id={`day-${index}`}
                      value={day.type}
                      onChange={(e) => handleAccommodationChange(index, 'type', e.target.value)}
                      className="mt-1"
                    >
                      <option value="">Choose a day</option>
                      <option value="hotel-3star">3 Star Hotel</option>
                      <option value="hotel-4star">4 Star Hotel</option>
                      <option value="hotel-5star">5 Star Hotel</option>
                      <option value="resort">Resort</option>
                      <option value="apartment">Apartment</option>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-gray-600">
                      {day.addCompliment ? 'Compliment added' : 'Check if it is same as previous day'}
                    </div>
                  </div>
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAccommodationChange(index, 'addCompliment', !day.addCompliment)}
                    >
                      Add Compliment
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Food Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Food</h3>
            <div className="space-y-4">
              {data.food.map((food, index) => (
                <div key={food.id} className="grid grid-cols-4 gap-4 items-end">
                  <div>
                    <Label htmlFor={`food-${index}`} className="text-sm font-medium text-gray-700">
                      {food.name}
                    </Label>
                    <Select
                      id={`food-${index}`}
                      value={food.included}
                      onChange={(e) => handleFoodChange(index, 'included', e.target.value)}
                      className="mt-1"
                    >
                      <option value="">Excluded with this stay</option>
                      <option value="included">Included with this stay</option>
                      <option value="optional">Optional add-on</option>
                      <option value="separate">Separate booking</option>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-gray-600">
                      {food.addCompliment ? 'Compliment added' : 'Add Compliment'}
                    </div>
                  </div>
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFoodChange(index, 'addCompliment', !food.addCompliment)}
                    >
                      Add Compliment
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lunch Special Field */}
          <div>
            <Label htmlFor="lunch" className="text-sm font-medium text-gray-700">
              Lunch
            </Label>
            <Select
              id="lunch"
              value={data.lunch}
              onChange={(e) => handleInputChange('lunch', e.target.value)}
              className="mt-1"
            >
              <option value="">Not Included</option>
              <option value="included">Included</option>
              <option value="optional">Optional</option>
            </Select>
            <div className="mt-2">
              <Button variant="outline" size="sm">
                Add Compliment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 