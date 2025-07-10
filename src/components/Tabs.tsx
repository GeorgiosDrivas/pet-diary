import React, { useState } from "react";
import Appointments from "./appointments/Appointments";
import PetDetails from "./pet/PetDetails";
import Note from "./notes/Note";

export default function Tabs({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState<string>("Pet Details");
  const tabs = ["Pet Details", "Appointments", "Notes"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Pet Details":
        return <PetDetails userId={userId} />;
      case "Appointments":
        return <Appointments userId={userId} />;
      case "Notes":
        return <Note userId={userId} />;
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
