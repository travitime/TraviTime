import Card from "../Card"
import { Ellipsis } from 'lucide-react';
import AIAssist from "./AIAssist";
import ToDos from "./ToDos";
export default function QuickActions() {    
    return (
        <Card bg="bg-white" padding="p-4">
            <div className="flex items-center justify-between pb-4 ">
                <h2 className="text-lg font-semibold">Get Things Done</h2>
                <Ellipsis size={16}  />
            </div>
            <div className="space-y-4">
            <AIAssist />
            <ToDos />
            </div>
            
        </Card>
    )};