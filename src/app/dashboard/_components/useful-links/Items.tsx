import Image from 'next/image'
import { BookOpen} from 'lucide-react';
import VideoPlaceholderThumbnail from "../../assets/video-placeholder.svg"
export default function SignInPage() {
    return (
    <div><div className="flex gap-2 items-start  justify-between">
    <Image
        src={VideoPlaceholderThumbnail}
        alt="Recent Trips"
        width={140} 
        height={0} 
    />
    <div className="flex-1 ">
            <h3 className="text-gray-800 text-[14px] font-semibold">Creating Itineraries</h3>
            <p className="text-gray-500 text-sm">See how you can create itineraries with all the details like activities, accommodation, food and transportation</p>
            
        </div>
        
        
    </div>
    <ul className='px-1 py-1'>
    <li className='text-gray-500 text-sm flex gap-1 items-center'><BookOpen size={12}  />Itineraries</li>
    <li className='text-gray-500 text-sm flex gap-1 items-center'><BookOpen size={12}  />Quotes</li>
</ul></div>)
    }