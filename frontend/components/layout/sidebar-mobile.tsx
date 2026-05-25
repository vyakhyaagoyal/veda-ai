"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Settings, X, Bell } from "lucide-react";
import { usePathname }
from "next/navigation";
import { Plus } from "lucide-react";

import { navigationItems } from "@/lib/navigation";
import { useUserStore } from "@/store/user.store";

const SidebarMobile = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  const pathname = usePathname();

  return (
    <>
      {/* ── Floating Topbar ── */}
      <header className="md:hidden fixed top-4 left-4 right-4 z-50">
        <div className="bg-white rounded-full px-3.5 py-2.5 flex items-center justify-between border border-zinc-200/70 shadow-sm">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/veda-ai-logo.svg"
              alt="VedaAI Logo"
              width={34}
              height={34}
              className="w-[34px] h-[34px]"
            />
            <span className="text-[17px] font-bold tracking-tight text-[#2D2D2D]">
              VedaAI
            </span>
          </Link>

          {/* Right controls */}
          <div className="flex items-center gap-2.5">

            {/* Bell */}
            <button
              aria-label="Notifications"
              className="relative p-1"
            >
              <Bell size={20} strokeWidth={1.8} className="text-[#2D2D2D]" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#E8441A] rounded-full border-[1.5px] border-white" />
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200/70 flex-shrink-0">
              <Image
                src={user?.avatar || "/Avatar.png"}
                alt="User avatar"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hamburger */}
            <button
              aria-label="Open menu"
              onClick={() => setIsOpen(true)}
              className="flex flex-col gap-[4.5px] p-1"
            >
              <span className="block w-[18px] h-[1.5px] bg-[#2D2D2D] rounded-full" />
              <span className="block w-[18px] h-[1.5px] bg-[#2D2D2D] rounded-full" />
              <span className="block w-[18px] h-[1.5px] bg-[#2D2D2D] rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Drawer Overlay ── */}
      <div
        onClick={() => setIsOpen(false)}
        className={`
          md:hidden fixed inset-0 z-50 bg-black/20
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* ── Drawer Panel ── */}
      <div
        className={`
          md:hidden fixed top-0 right-0 bottom-0 z-50
          w-[78%] max-w-[300px]
          bg-white flex flex-col p-6
          rounded-l-[32px]
          transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <Image
              src="/veda-ai-logo.svg"
              alt="VedaAI Logo"
              width={30}
              height={30}
              className="w-[30px] h-[30px]"
            />
            <span className="text-[15px] font-bold tracking-tight text-[#2D2D2D]">
              VedaAI
            </span>
          </Link>
          <button
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-[#2D2D2D] hover:bg-zinc-200 transition-colors"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Create Assignment */}
        <div className="mb-6">
          <div className="p-[2.5px] rounded-full bg-gradient-to-b from-[#FF7A50] to-[#C1350A]">
            <Link href="/assignments/create" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-[#2D2D2D] hover:bg-black transition-colors text-white rounded-full py-2.5 px-5 flex items-center justify-center gap-2 text-[13px] font-semibold">
                <Image
                  src="/star-icon.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-auto h-auto"
                />
                Create Assignment
              </button>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navigationItems.map((item) => {
            const isActive = false; // replace with usePathname() comparison

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-3.5 py-2.5 rounded-xl
                  text-[13px] transition-all duration-200
                  ${isActive
                    ? "bg-[#F3F3F3] text-[#2D2D2D] font-semibold"
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
                  }
                `}
              >
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto">
          <Link
            href="/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3.5 py-2.5 text-zinc-500 hover:text-zinc-700 text-[13px] transition-colors rounded-xl hover:bg-zinc-100 mb-2"
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>

          {/* School Card */}
          <div className="bg-[#F4F4F4] rounded-2xl p-3.5 border border-zinc-200/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={user?.avatar || "/Avatar.png"}
                  alt="School"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-[12px] text-[#2D2D2D]">
                  {user?.school.name}
                </h4>
                <p className="text-[11px] text-zinc-500">{user?.school.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating Create Button ── */}
<Link
  href="/assignments/create"
  className="
    md:hidden
    fixed
    bottom-[88px]
    right-4
    sm:right-5
    z-[60]
  "
>
  <button
    className="
      w-13 h-13
      sm:w-14 sm:h-14
      rounded-full
      bg-white
      shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      border border-zinc-200/70
      flex items-center justify-center
      active:scale-95
      transition-all duration-300
    "
  >
    <Plus
      size={22}
      strokeWidth={2.2}
      className="text-[#FF5A2F]"
    />
  </button>
</Link>

{/* ── Bottom Dock ── */}
{/* ── Bottom Dock ── */}
<div
  className="
    md:hidden
    fixed
    bottom-3
    sm:bottom-4
    left-1/2
    -translate-x-1/2
    z-50
    w-[94%]
    max-w-[420px]
    px-1
  "
>
  <div
    className="
  bg-[#111111]
  rounded-[24px]
  sm:rounded-[28px]
  px-2
  sm:px-5
  py-2.5
  sm:py-3
  flex
  items-center
  justify-between
  shadow-[0_10px_40px_rgba(0,0,0,0.22)]
  border border-white/5
  backdrop-blur-xl
"
  >
    {navigationItems
      .slice(0, 4)
      .map((item) => {
        const isActive =
          pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={() =>
              setIsOpen(false)
            }
            className="
  flex
  flex-col
  items-center
  justify-center
  gap-[2px]
  flex-1
  py-1
  transition-all
"
          >
            <item.icon
              size={16}
              strokeWidth={
                isActive ? 2.5 : 2
              }
              className={
                isActive
                  ? "text-white"
                  : "text-zinc-500"
              }
            />

            <span
              className={`
                text-[9px]
sm:text-[11px]
                transition-colors
                ${
                  isActive
                    ? "text-white font-medium"
                    : "text-zinc-500"
                }
              `}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
  </div>
</div>

      {/* ── Spacer so page content clears the topbar ── */}
      <div className="md:hidden h-[72px]" />
    </>
  );
};

export default SidebarMobile;