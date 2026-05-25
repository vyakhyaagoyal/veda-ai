"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { io } from "socket.io-client";

import { Trash2 } from "lucide-react";

import { useEffect } from "react";

import { notificationService } from "@/services/notification.service";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Settings, X, Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";

import { navigationItems } from "@/lib/navigation";
import { useUserStore } from "@/store/user.store";

const SidebarMobile = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const user = useUserStore((state) => state.user);
  const pathname = usePathname();

  const socket = io(
    process.env.NEXT_PUBLIC_API_URL ||
      "https://veda-ai-production-39b3.up.railway.app",
  );

  useEffect(() => {
    fetchNotifications();

    socket.on("generation-complete", () => {
      fetchNotifications();
    });

    socket.on("generation-failed", () => {
      fetchNotifications();
    });

    return () => {
      socket.off("generation-complete");

      socket.off("generation-failed");
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await notificationService.getNotifications();

      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? {
                ...notification,
                read: true,
              }
            : notification,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      await notificationService.clearAll();

      setNotifications([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Floating Topbar ── */}
      <header
        className="
    md:hidden
    fixed
    top-3
    sm:top-4
    left-3
    right-3
    sm:left-4
    sm:right-4
    z-[120]
  "
      >
        <div
          className="
    bg-white
    rounded-full
    px-3
    sm:px-4
    py-2
    sm:py-2.5
    flex
    items-center
    justify-between
    border
    border-zinc-200/70
    shadow-sm
    backdrop-blur-xl
  "
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/veda-ai-logo.svg"
              alt="VedaAI Logo"
              width={34}
              height={34}
              className="
    w-[28px]
    h-[28px]
    sm:w-[34px]
    sm:h-[34px]
    mt-2
    
  "
            />
            <span
              className="
    text-[15px]
    sm:text-[17px]
    font-bold
    tracking-tight
    text-[#2D2D2D]
  "
            >
              VedaAI
            </span>
          </Link>

          {/* Right controls */}
          <div className="flex items-center gap-2.5">
            {/* Bell */}
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button aria-label="Notifications" className="relative p-1">
                  <Bell
                    size={20}
                    strokeWidth={1.8}
                    className="text-[#2D2D2D]"
                  />

                  {notifications.some((n) => !n.read) && (
                    <span
                      className="
            absolute
            top-0.5
            right-0.5
            w-2
            h-2
            bg-[#E8441A]
            rounded-full
            border-[1.5px]
            border-white
          "
                    />
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                sideOffset={12}
                align="center"
                className="
    fixed
    left-1/2
    top-[78px]
    -translate-x-1/2

    w-[92vw]
    max-w-[360px]

    rounded-[28px]

    border
    border-zinc-200/70

    bg-white

    shadow-[0_20px_60px_rgba(0,0,0,0.18)]

    p-0
    overflow-hidden

    z-[200]

    backdrop-blur-xl
  "
              >
                {/* Header */}
                <div
                  className="
        px-5
        py-4
        border-b
        border-zinc-100
        flex
        items-center
        justify-between
      "
                >
                  <h3 className="font-semibold text-[15px]">Notifications</h3>

                  {notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="
    flex
    items-center
    gap-1

    text-[11px]
    sm:text-xs

    font-medium

    text-red-500
    hover:text-red-600

    transition-colors
  "
                    >
                      <Trash2 size={12} />
                      Clear All
                    </button>
                  )}
                </div>

                {/* Notifications */}
                <div className="max-h-[340px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-5 py-10 text-center text-sm text-zinc-400">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <button
                        key={notification._id}
                        onClick={async () => {
                          await markAsRead(notification._id);

                          window.location.href = `/assignments/${notification.assignmentId}`;
                        }}
                        className="
        w-full
        text-left

        px-5
        py-4

        border-b
        border-zinc-100

        hover:bg-zinc-50
        transition-colors
      "
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-[#2D2D2D]">
                              {notification.title}
                            </p>

                            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                              {notification.message}
                            </p>
                          </div>

                          {!notification.read && (
                            <div
                              className="
              w-2
              h-2
              rounded-full
              bg-[#FF5A2F]
              mt-2
              flex-shrink-0
            "
                            />
                          )}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

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
          md:hidden fixed inset-0 z-[130] bg-black/20
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* ── Drawer Panel ── */}
      <div
        className={`
          md:hidden fixed top-0 right-0 bottom-0 z-[140]
          w-[84%]
xs:w-[80%]
sm:w-[74%]
max-w-[320px]
          bg-white
flex
flex-col
px-5
pt-6
pb-[max(24px,env(safe-area-inset-bottom))]
          rounded-l-[32px]
          transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
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
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-3.5 py-2.5 rounded-xl
                  text-[12px]
sm:text-[13px] transition-all duration-200
                  ${
                    isActive
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
    z-[70]
  "
      >
        <button
          className="
      w-12
h-12
sm:w-14
sm:h-14
      rounded-full
      bg-white
      shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      border border-zinc-200/70
      flex items-center justify-center
      active:scale-95
      transition-all duration-300
    "
        >
          <Plus size={22} strokeWidth={2.2} className="text-[#FF5A2F]" />
        </button>
      </Link>

      {/* ── Bottom Dock ── */}
      <div
        className="
    md:hidden
    fixed
    bottom-3
    sm:bottom-4
    left-1/2
    -translate-x-1/2
    z-[60]
    w-[calc(100%-16px)]
max-w-[430px]
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
  py-2
sm:py-3
  flex
  items-center
  justify-between
  shadow-[0_10px_40px_rgba(0,0,0,0.22)]
  border border-white/5
  backdrop-blur-xl
"
        >
          {navigationItems.slice(0, 4).map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="
  flex
  flex-col
  items-center
  justify-center
  text-center

  gap-[3px]

  flex-1
  min-w-0

  py-1

  transition-all
"
              >
                <item.icon
                  size={14}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={isActive ? "text-white" : "text-zinc-500"}
                />

                <span
                  className={`
    w-full

    text-center
    leading-tight

    text-[9px]
    sm:text-[11px]

    transition-colors

    ${isActive ? "text-white font-medium" : "text-zinc-500"}
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
      {/* <div className="md:hidden h-[96px]" /> */}
    </>
  );
};

export default SidebarMobile;
