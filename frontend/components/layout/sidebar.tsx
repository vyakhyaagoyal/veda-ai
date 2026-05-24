"use client";

import Image from "next/image";
import Link from "next/link";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/lib/navigation";
import { useUserStore } from "@/store/user.store";

const Sidebar = () => {
  const pathname = usePathname();

  const user = useUserStore((state) => state.user);

  return (
    <aside className="w-[290px] h-screen bg-white rounded-[32px] shadow-sm border border-zinc-200/70 flex flex-col p-6 sticky top-0">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center mb-6">
          <Image
            src="/veda-ai-logo.svg"
            alt="VedaAI Logo"
            width={72}
            height={72}
            loading="eager"
            className="w-[72px] h-[72px]"
          />

          <span className="text-[2rem] font-bold tracking-tight text-[#2D2D2D] mb-5">
            VedaAI
          </span>
        </div>
      </Link>

      {/* Create Assignment */}
      <div className="mb-10">
        <div className="p-[3px] rounded-full bg-gradient-to-b from-[#FF7A50] to-[#C1350A]">
          <Link href="/assignments/create">
            <button className="w-full cursor-pointer bg-[#2D2D2D] hover:bg-black transition-all duration-300 text-white rounded-full py-3 px-6 flex items-center justify-center gap-2 font-medium">
              <Image
                src="/star-icon.svg"
                alt="star"
                width={18}
                height={18}
                className="w-auto h-auto"
              />
              Create Assignment
            </button>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-[#F3F3F3] text-[#2D2D2D] font-semibold"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />

              <span className="text-[15px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-zinc-700 transition-colors"
        >
          <Settings size={20} />

          <span className="text-[15px]">Settings</span>
        </Link>

        {/* School Card */}
        <div className="mt-3 bg-[#F4F4F4] rounded-2xl p-4 border border-zinc-200/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={user?.avatar || "/Avatar.png"}
                alt="School"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h4 className="font-bold text-sm text-[#2D2D2D]">
                {user?.school.name}
              </h4>

              <p className="text-xs text-zinc-500">{user?.school.city}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
