import React from 'react'
import Image from 'next/image'
import { Ellipsis} from 'lucide-react';
import { Button } from "@/components/ui/button"
import RecentTripThumbnail from "../../assets/recent-trip-thumbnail.svg"
import Card from '../Card';
import RecentsTrip from './RecentsTrip';
import RecentsCommunication from './RecentsCommunication';

export default function RecentsBlock() {
    return (
        <div className='space-y-6'>
            <RecentsTrip />
            <RecentsCommunication />
        </div>
    )
    }