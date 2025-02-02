import React from 'react'
import StatsItem from './StatsItem'
export default function Stats() {
    return (
        <div className='w-full flex gap-4 justify-between'>
            <StatsItem metric='New Customers' value='-' description='since last month'/>
            <StatsItem metric='Upcoming trips' value='-' description='since last month'/>
            <StatsItem metric='Payments Received' value='-' description='since last month'/>
            <StatsItem metric='Payments Due' value='-' description='since last month'/>
          </div>
    )
    }