import { Pet } from "@/types";
import React, { useState } from "react";
import DemoPetDetails from "./DemoPetDetails";
import DemoAppointments from "./DemoAppointments";

export default function DemoTabs({ pet }: { pet: Pet }) {
  const [activeTab, setActiveTab] = useState<string>("Pet Details");
  const tabs = ["Pet Details", "Appointments", "Medication"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Pet Details":
        return <DemoPetDetails pet={pet} />;
      case "Appointments":
        return <DemoAppointments pet={pet} />;
      case "Medication":
      // return <Medication pet={pet} userId={userId} />;
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
