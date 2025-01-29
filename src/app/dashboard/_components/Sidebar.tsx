// components/Sidebar.tsx
export const Sidebar = () => {
    return (
      <div className="w-80 bg-gray-50 p-6">
        <div className="space-y-6">
          <div className="bg-rose-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Assistant</h3>
            <p className="text-sm text-gray-600">Ready to dive into work? Ask me anything.</p>
            <input
              type="text"
              placeholder="I want to..."
              className="mt-4 w-full rounded-lg border p-2"
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">To-do List</h3>
              <span>0/0</span>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Useful links</h3>
            {/* Add links content */}
          </div>
        </div>
      </div>
    );
  };