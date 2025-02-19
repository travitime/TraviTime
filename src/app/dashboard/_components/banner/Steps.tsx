import React from 'react'
import Card from '../Card';
export function Steps({icon, title, description}: {icon?: React.ReactNode, title?: string, description?: string}) {
return (
    <Card bg="bg-white">
        <div className="flex items-start p-4">
            <div className="flex-shrink-0 py-1">
                {icon}
            </div>
            <div className="ml-4">
                <h3 className="text-regular font-semibold m-0">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    </Card>
);
}