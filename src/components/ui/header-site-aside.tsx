import React from 'react';
import { Info, User, Cog , Search, Bell} from 'lucide-react';
import { Button } from "@/components/ui/button"

const HeaderSiteAside: React.FC = () => {
    return (
        <div className='flex gap-4'>
            <Button variant={'outline'} >
            Contact Sales
            </Button>
            <Button >
            Sign up
            </Button>
        </div>
    );
};

export default HeaderSiteAside;