"use client";

import { usePathname } from "next/navigation";

import Sidebar from "@/components/layout/sidebar";
import SidebarMobile from "@/components/layout/sidebar-mobile";
import Topbar from "@/components/layout/topbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup";

  if (isAuthPage) {
    return (
      <main className="min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <div className="flex min-h-screen overflow-x-hidden">

      {/* Desktop Sidebar */}
      <div className="hidden lg:block p-4">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <SidebarMobile />
      </div>

      {/* Main Content */}
      <div
        className="
          flex-1
          min-w-0
          min-h-screen
        "
      >

        {/* Desktop Topbar */}
        <div className="hidden lg:block py-4 px-2">
          <Topbar />
        </div>

        <main
          className="
            flex-1
            overflow-y-auto
            overflow-x-hidden
            pt-[96px]
            lg:pt-0
            pb-[120px]
            lg:pb-0
            min-h-screen
          "
        >
          {children}
        </main>

      </div>
    </div>
  );
}