import React from "react";
import RecentsTrip from "./RecentsTrip";
import RecentsCommunication from "./RecentsCommunication";

export default function RecentsBlock() {
  return (
    <div className="space-y-6">
      <RecentsTrip />
      <RecentsCommunication />
    </div>
  );
}
