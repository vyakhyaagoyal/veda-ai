import React from 'react';
import Sidebar from './sidebar';
import Topbar from './topbar';
import MainContent from './main-content';

const DashboardDesktop = () => {
  return (
    <div className="flex h-screen p-4 bg-[#F9F9F9] antialiased text-[#2D2D2D] overflow-hidden">
      {/* Sidebar - Fixed Width */}
      <Sidebar />

      {/* Right Side Content Area */}
      <div className="flex-1 flex flex-col min-w-0 p-2">
        <Topbar />
        
        {/* Content Area with Scroll */}
        <div className="flex-1 overflow-y-auto">
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default DashboardDesktop;

/**
 * Tech Stack & Features Included:
 * - Next.js + TypeScript structure
 * - Tailwind CSS for pixel-perfect layout and styling
 * - Lucide-react for iconography
 * - Responsive flexbox architecture
 * - Hover and active states for interactive elements
 */
