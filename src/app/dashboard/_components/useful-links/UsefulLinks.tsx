import React from 'react';
import Items from './Items';
import Card from '../Card';
export default function UsefulLinks() {
    return (
        <Card className="border border-gray-200" padding='p-4'>
    <div className="flex items-center justify-between  pb-4">
        <h2 className="text-lg font-semibold">Useful links</h2>
    </div>
        <ul className='space-y-2'>
            <li><Items /></li>
            <li><Items /></li>
        </ul>
        </Card>
    );
    }