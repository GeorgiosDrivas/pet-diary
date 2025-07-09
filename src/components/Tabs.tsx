import { Pet } from "@/types";
import React, { useState } from "react";
import Appointments from "./appointments/Appointments";
import PetDetails from "./pet/PetDetails";
import Note from "./notes/Note";

export default function Tabs({
  pet,
  userId,
  refreshUserData,
}: {
  pet: Pet;
  userId: string;
  refreshUserData: () => Promise<void>;
}) {
  const [activeTab, setActiveTab] = useState<string>("Pet Details");
  const tabs = ["Pet Details", "Appointments", "Notes"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Pet Details":
        return (
          <PetDetails
            pet={pet}
            userId={userId}
            refreshUserData={refreshUserData}
          />
        );
      case "Appointments":
        return <Appointments pet={pet} userId={userId} />;
      case "Notes":
        return <Note pet={pet} userId={userId} />;
    }
  };
  return (
    <div id="tabs" className="mt-8">
      <div className="tabs flex justify-start items-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`me-4 tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}
