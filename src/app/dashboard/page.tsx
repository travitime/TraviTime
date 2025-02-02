import React from 'react'
import { GetStarted } from "./_components/banner/GetStarted";
import Stats from './_components/stats/Stats';
import RecentsBlock from './_components/recents-block/RecentsBlock';
import QuickActions from './_components/quick-actions/QuickActions';
import UsefulLinks from './_components/useful-links/UsefulLinks';

export default function DashboardPageage() {
  return (
    <div className='w-full "'>
      <GetStarted />
     
      <div className="grid grid-cols-12 gap-6 px-6 py-3 bg-gray-50">
        <div className="col-span-8  rounded-xl flex flex-col gap-6 py-3" >
            <Stats />
          <div className='w-full '>
            <RecentsBlock />
          </div>
       </div>
       <div className="col-span-4 rounded-xl flex flex-col gap-6 py-3" >
        <QuickActions />
        <UsefulLinks />
       </div>
      </div>
      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
      {/* <div className="grid grid-cols-4 gap-4">
      <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" /> 
      </div> */}
    </div>
  );
}
