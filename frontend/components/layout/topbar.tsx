"use client";

import {
  ArrowLeft,
  LayoutGrid,
  Bell,
  ChevronDown,
  LogOut,
  GraduationCap,
  School,
} from "lucide-react";

import Image from "next/image";

import { useRouter, usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useUserStore } from "@/store/user.store";

const Topbar = () => {
  const router = useRouter();

  const pathname = usePathname();

  const { user, logout } = useUserStore();

  const pageTitleMap: Record<string, string> = {
    "/assignments": "Assignment",
    "/groups": "Groups",
    "/toolkit": "AI Teacher Toolkit",
    "/library": "Library",
  };

  const pageTitle =
    pageTitleMap[pathname] || "Dashboard";

  return (
    <header className="h-[72px] bg-white rounded-[28px] shadow-sm border border-zinc-200/70 px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-zinc-100 transition-colors"
        >
          <ArrowLeft
            size={20}
            strokeWidth={2.5}
            className="text-zinc-700"
          />
        </button>

        <div className="flex items-center gap-2 text-zinc-400">
          <LayoutGrid size={18} />

          <span className="font-medium text-zinc-500">
            {pageTitle}
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-zinc-100 transition-colors">
          <Bell
            size={22}
            className="text-zinc-700"
          />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange-500 border-2 border-white rounded-full" />
        </button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 pl-5 border-l border-zinc-200 cursor-pointer">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200">
                <Image
                  src={user?.avatar || "/avatar.png"}
                  alt="User"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#2D2D2D] text-[15px]">
                  {user?.name}
                </span>

                <ChevronDown
                  size={18}
                  className="text-zinc-400"
                />
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-64 rounded-2xl p-2"
          >
            <div className="px-3 py-2">
              <h4 className="font-semibold text-sm">
                {user?.name}
              </h4>

              <p className="text-xs text-zinc-500">
                {user?.role}
              </p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="rounded-xl cursor-pointer py-3">
              <GraduationCap className="mr-2 h-4 w-4" />

              Teacher
            </DropdownMenuItem>

            <DropdownMenuItem className="rounded-xl cursor-pointer py-3">
              <School className="mr-2 h-4 w-4" />

              {user?.school.name}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout}
              className="rounded-xl cursor-pointer py-3 text-red-500 focus:text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />

              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;