import React from 'react'
import Image from 'next/image'
import { Ellipsis} from 'lucide-react';
import { Button } from "@/components/ui/button"
import RecentCommunicationThumbnail from "../../assets/recent-communication-thumbnail.svg"
import Card from '../Card';

export default function RecentsCommunication() {
    return (
        <Card bg="bg-white" >
            <div className="flex items-center justify-between p-4 ">
                <h2 className="text-lg font-semibold">Recent Communication</h2>
                <Ellipsis size={16}  />
            </div>

            <div className="flex items-center p-4">
                <div className="flex-1">
                    <p className="text-gray-700 mb-4">You do not have any customers. Create them and start engaging!</p>
                    <Button >Create Customer</Button>
                </div>
                <div className="ml-4">
                <Image
                src={RecentCommunicationThumbnail}
                alt="Recent Trips"
                width={180} 
                height={0} 
            /> </div>
            </div>
        </Card>
    )
    }