import React from "react";
import Image from "next/image";
import {
  Users,
  FileText,
  Settings,
  LayoutGrid,
  ChartPie,
  Book 
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { icon: LayoutGrid, label: "Home", active: false },
    { icon: Users, label: "My Groups", active: false },
    { icon: FileText, label: "Assignments", active: true },
    { icon: Book , label: "AI Teacher's Toolkit", active: false },
    { icon: ChartPie, label: "My Library", active: false },
  ];

  return (
    <aside className="w-[290px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col p-6 sticky top-0">
      {/* Logo */}
      <div className="flex items-center mb-7">
        <Image
          src="/veda-ai-logo.svg"
          alt="VedaAI Logo"
          width={60}
          height={60}
          className="mt-5 w-20 h-20"
        />
        <span className="text-[2rem] font-bold text-[#2D2D2D] tracking-tight">
          VedaAI
        </span>
      </div>

      {/* Create Button */}
      <div className="w-full p-[3px] rounded-full bg-gradient-to-b from-[#FF7950] to-[#C0350A] mb-8">
        <button className="w-full bg-[#2D2D2D] hover:bg-black text-white rounded-full py-2.5 px-6 flex items-center justify-center gap-2 transition-all shadow-md group relative overflow-hidden">
          <Image src="/star-icon.svg" alt="star" height={20} width={20} />

          <span className="font-light tracking-tight">Create Assignment</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              item.active
                ? "bg-[#F2F2F2] text-[#2D2D2D] font-semibold"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            <item.icon size={20} strokeWidth={item.active ? 2.5 : 2} />
            <span className="text-[15px]">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Footer / Profile */}
      <div className="mt-auto pt-6 space-y-2">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Settings size={20} />
          <span className="text-[15px]">Settings</span>
        </a>

        <div className="bg-[#F2F2F2] p-4 rounded-2xl flex items-center gap-3 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-orange-100 border-2 border-white shadow-sm flex-shrink-0">
            <img
              src="/avatar.png"
              alt="School logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-[#2D2D2D] text-[13px] truncate leading-tight">
              Delhi Public School
            </p>
            <p className="text-gray-500 text-[11px] truncate">
              Bokaro Steel City
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
