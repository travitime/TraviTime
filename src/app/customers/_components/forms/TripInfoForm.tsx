'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CalendarIcon, MapPinIcon } from 'lucide-react'

interface TripInfoData {
  destinationCountry: string
  destinationCities: string
  fromDate: string
  endDate: string
  travelType: string
  category: string
  groupSize: string
  notes: string
  itinerary: string
}

interface TripInfoFormProps {
  data: TripInfoData
  onChange: (data: TripInfoData) => void
}

export function TripInfoForm({ data, onChange }: TripInfoFormProps) {
  const handleInputChange = (field: keyof TripInfoData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Trip Info</h2>
        
        <div className="space-y-6">
          {/* Destination Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="destinationCountry" className="text-sm font-medium text-gray-700">
                Destination Country
              </Label>
              <div className="relative mt-1">
                <Input
                  id="destinationCountry"
                  value={data.destinationCountry}
                  onChange={(e) => handleInputChange('destinationCountry', e.target.value)}
                  placeholder="Select destination country"
                  className="pl-10"
                />
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="destinationCities" className="text-sm font-medium text-gray-700">
                Destination Cities/Places
              </Label>
              <div className="relative mt-1">
                <Input
                  id="destinationCities"
                  value={data.destinationCities}
                  onChange={(e) => handleInputChange('destinationCities', e.target.value)}
                  placeholder="Select cities/places"
                  className="pl-10"
                />
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fromDate" className="text-sm font-medium text-gray-700">
                From Date
              </Label>
              <div className="relative mt-1">
                <Input
                  id="fromDate"
                  type="date"
                  value={data.fromDate}
                  onChange={(e) => handleInputChange('fromDate', e.target.value)}
                  placeholder="dd-mm-yyyy"
                  className="pl-10"
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                End Date
              </Label>
              <div className="relative mt-1">
                <Input
                  id="endDate"
                  type="date"
                  value={data.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  placeholder="dd-mm-yyyy"
                  className="pl-10"
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Travel Type and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="travelType" className="text-sm font-medium text-gray-700">
                Travel Type
              </Label>
              <select
                id="travelType"
                value={data.travelType}
                onChange={(e) => handleInputChange('travelType', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Leisure">Leisure</option>
                <option value="Business">Business</option>
                <option value="Adventure">Adventure</option>
                <option value="Religious">Religious</option>
              </select>
            </div>
            <div>
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category
              </Label>
              <select
                id="category"
                value={data.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Flights + Accommodation">Flights + Accommodation</option>
                <option value="Flights Only">Flights Only</option>
                <option value="Accommodation Only">Accommodation Only</option>
                <option value="Full Package">Full Package</option>
              </select>
            </div>
          </div>

          {/* Group Size */}
          <div>
            <Label htmlFor="groupSize" className="text-sm font-medium text-gray-700">
              Group Size
            </Label>
            <Input
              id="groupSize"
              type="number"
              value={data.groupSize}
              onChange={(e) => handleInputChange('groupSize', e.target.value)}
              className="mt-1 max-w-xs"
              placeholder="Enter group size"
              min="1"
            />
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={data.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="mt-1"
              rows={4}
              placeholder="Add any additional notes or requirements..."
            />
          </div>

          {/* Itinerary */}
          <div>
            <Label htmlFor="itinerary" className="text-sm font-medium text-gray-700">
              Itinerary
            </Label>
            <select
              id="itinerary"
              value={data.itinerary}
              onChange={(e) => handleInputChange('itinerary', e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Choose an itinerary</option>
              <option value="itinerary-1">Standard Europe Tour</option>
              <option value="itinerary-2">Asia Adventure Package</option>
              <option value="itinerary-3">Beach Vacation Package</option>
            </select>
            <p className="mt-2 text-xs text-gray-500">
              You can choose an itinerary from library if it suits this customer. You can always create new itinerary later.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 