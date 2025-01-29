import { GetStarted } from "./_components/GetStarted";
import { Sidebar } from "./_components/Sidebar";
import { Stats } from "./_components/Stats";

export default function DashboardPage() {
  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <GetStarted />
        <Stats />
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Recent Trips</h2>
          <div className="bg-white p-6 rounded-lg">
            <p>You do not have any itineraries created!</p>
            <button className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded">
              Create Itinerary
            </button>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Recent Communication</h2>
          {/* Add communication content */}
        </div>
      </div>
      <Sidebar />
    </div>
  );
}