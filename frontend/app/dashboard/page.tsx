import React from 'react';
// import Sidebar from './sidebar';
// import Topbar from './topbar';
import MainContent from '../../components/assignments/assignments-dashboard';

const DashboardDesktop = () => {
  return (
    <div className="flex h-screen bg-[#F9F9F9] antialiased text-[#2D2D2D] overflow-hidden">

      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Content Area */}
        <div className="flex-1">
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