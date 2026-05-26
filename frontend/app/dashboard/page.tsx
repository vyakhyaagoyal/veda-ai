import React from "react";

import MainContent from "../../components/assignments/assignments-dashboard";

const DashboardDesktop = () => {
  return (
    <div
      className="
        w-full
        min-h-screen
        antialiased
        text-[#2D2D2D]
        overflow-x-hidden
        overflow-y-auto
      "
      //bg-[#F9F9F9]
    >
      <div className="w-full min-w-0">
        {/* Content Area */}
        <div className="w-full">
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default DashboardDesktop;