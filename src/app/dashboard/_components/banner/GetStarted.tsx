import React from 'react'
import { ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { Steps } from './Steps';
import { Check, DollarSign, MailCheck, FileCheck} from 'lucide-react';
import Card from '../Card';
export function GetStarted () {
    return (
        <Card bg='bg-[#ffc81b33]'>
<Accordion.Root type="single" collapsible className="w-full " defaultValue='id'>
  <Accordion.Item value={"id"} className="border-b gap-2 !border-none !border-transparent">
    <Accordion.Header className='w-full p-6 pb-2 flex items-center justify-between'>
    <span className="flex-grow text-3xl font-normal">Get Started with Traweio</span>
      <Accordion.Trigger className=" px-4  text-left font-medium  transition">
        
        <ChevronDown className="h-5 w-5 transition-transform duration-200" />
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="p-6 pt-2 text-gray-600 ">
      <div className="grid grid-cols-4 gap-4">
      <Steps icon={<Check size={24}  className='bg-green-300 rounded-full p-1'/>} title="Create an Itinerary" description="Create itinerary with activities, accommodation, mode of transport and more"/>
      <Steps icon={<DollarSign size={24} className='bg-yellow-300 rounded-full p-1'/>} title="Create a Quote" description="Send rough estimates of how much the trip will cost along with itinerary"/>
      <Steps icon={<MailCheck size={24} className='bg-yellow-300 rounded-full p-1'/>} title="Send email" description="Send an email to your customer with a created quote and start engaging"/>
      <Steps icon={<FileCheck size={24} className='bg-yellow-300 rounded-full p-1'/>} title="Share documents securely" description="Send secure links to store and share essential documents for the travel"/>
       
        
      </div>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
</Card>)
    
    };