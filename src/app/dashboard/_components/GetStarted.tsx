import { CheckIcon, ChevronDownIcon } from "lucide-react";

interface Step {
    title: string;
    description: string;
    icon: React.ReactNode;
  }

  
  export const GetStarted = () => {
    const steps: Step[] = [
      {
        title: 'Create an Itinerary',
        description: 'Create itinerary with activities, accommodation, mode of transport and more',
        icon: <CheckIcon className="text-green-500" />
      },
      // ... other steps
    ];

    return (
        <div className="bg-amber-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Get Started with Traweio</h2>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">1/4 completed</span>
              <ChevronDownIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                {/* Step content */}
              </div>
            ))}
          </div>
        </div>
      );
    };
    