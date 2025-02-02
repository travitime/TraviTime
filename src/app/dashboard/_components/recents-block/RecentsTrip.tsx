import React from 'react'
import Image from 'next/image'
import { Ellipsis} from 'lucide-react';
import { Button } from "@/components/ui/button"
import RecentTripThumbnail from "../../assets/recent-trip-thumbnail.svg"
import Card from '../Card';

export default function RecentsTrip() {
    return (
        <Card bg="bg-white" padding=''>
            <div className="flex items-center justify-between p-4 ">
                <h2 className="text-lg font-semibold">Recent Trips</h2>
                <Ellipsis size={16}  />
            </div>

            <div className="flex items-center p-4">
                <div className="flex-1">
                    <p className="text-gray-700 mb-4">You do not have any itineraries created!</p>
                    <Button >Create Itinerary</Button>
                </div>
                <div className="ml-4">
                <Image
                src={RecentTripThumbnail}
                alt="Recent Trips"
                width={200} 
                height={0} 
            />
                {/* <img src="https://via.placeholder.com/150" alt="Image" className="w-32 h-32 object-cover rounded-lg"> */}
                </div>
            </div>
        </Card>
    )
    }