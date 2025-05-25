import { Pet } from "@/types";
import React, { useState } from "react";
import Appointments from "./appointments/appointments";
import Medication from "./medications/medication";

export default function Tabs({ pet, userId }: { pet: Pet; userId: string }) {
  const [activeTab, setActiveTab] = useState<string>("Appointments");
  const tabs = ["Appointments", "Medication"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Appointments":
        return <Appointments pet={pet} userId={userId} />;
      case "Medication":
        return <Medication pet={pet} userId={userId} />;
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
