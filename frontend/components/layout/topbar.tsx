import React from 'react';
import { ArrowLeft, LayoutGrid, Bell, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const Topbar = () => {
  return (
    <header className="h-[62px] bg-white border-b rounded-2xl shadow-md border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
        <div className="flex items-center gap-2 text-gray-400">
          <LayoutGrid size={18} />
          <span className="text-gray-500 font-medium">Assignment</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-600">
          <Bell size={22} />
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <Image src="/avatar.png" alt="User" width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#2D2D2D] text-[15px]">John Doe</span>
            <ChevronDown size={18} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
