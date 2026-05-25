import React from "react";

import MainContent from "../../components/assignments/assignments-dashboard";

const DashboardDesktop = () => {
  return (
    <div
      className="
        w-full
        min-h-screen

        bg-[#F9F9F9]

        antialiased
        text-[#2D2D2D]

        overflow-x-hidden
        overflow-y-auto
      "
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