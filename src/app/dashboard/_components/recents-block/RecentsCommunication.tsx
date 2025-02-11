import React from "react";
import Image from "next/image";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecentCommunicationThumbnail from "../../assets/recent-communication-thumbnail.svg";
import Card from "../Card";
const users = [
  { name: "Jake Dicola", status: "Online", time: "", count: 3 },
  {
    name: "Jasmine Flinch",
    status: "10 min ago",
    time: "",
    count: 2,
    active: true,
  },
  { name: "Florence Nightingale", status: "Online", time: "", count: 1 },
  { name: "Raja Raya", status: "20 min ago", time: "" },
  { name: "Ramanathan Kin", status: "1 day ago", time: "" },
];

export default function RecentsCommunication() {
  const Communications = () => {
    return (
      <div className="flex">
        <div className="w-1/3">
          <ConversationList />
        </div>
        <div className="w-2/3 p-4">
          <Card className="h-full bg-gray-50">
            <></>
          </Card>
        </div>
      </div>
    );
  };
  const ConversationList = () => {
    return (
      <Card>
        {users.map((user, index) => (
          <div
            key={index}
            className={`flex items-center p-3 rounded-lg ${
              user.active ? "bg-purple-100" : "hover:bg-gray-100"
            }`}
          >
            <Image
              src={"/app-assets/avatar.png"}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3 flex-1">
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.status}</p>
            </div>
            {user.count && (
              <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full">
                {user.count}
              </span>
            )}
          </div>
        ))}
      </Card>
    );
  };
  const EmptyState = () => {
    return (
      <div className="flex items-center p-4">
        <div className="flex-1">
          <p className="text-gray-700 mb-4">
            You do not have any customers. Create them and start engaging!
          </p>
          <Button>Create Customer</Button>
        </div>
        <div className="ml-4">
          <Image
            src={RecentCommunicationThumbnail}
            alt="Recent Trips"
            width={180}
            height={0}
          />{" "}
        </div>
      </div>
    );
  };
  return (
    <Card bg="bg-white">
      <div className="flex items-center justify-between p-4 ">
        <h2 className="text-lg font-semibold">Recent Communication</h2>
        <Ellipsis size={16} />
      </div>
      {/* <EmptyState /> */}
      {true ? <Communications /> : <EmptyState />}
    </Card>
  );
}
