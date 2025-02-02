import React from 'react';
import Card from '../Card';
export default function ToDos() {
    return (
        <Card bg="bg-gray-100" padding='p-4'>
            <div className="flex items-center justify-between ">
                <h2 className="text-[16px] font-semibold">To-do List</h2>
                <h2 className="text-lg font-semibold">0/0</h2>
            </div>
            
                </Card>
    )};