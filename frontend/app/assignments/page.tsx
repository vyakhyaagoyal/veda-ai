"use client";
import React, { useState } from "react";
import {
  Home,
  Users,
  FileText,
  Wrench,
  Library,
  Settings,
  Plus,
  ArrowLeft,
  LayoutGrid,
  Bell,
  ChevronDown,
  MoreVertical,
  Search,
  Filter,
  BookOpen,
  Calendar,
  Trash2,
  ExternalLink,
} from "lucide-react";

import Topbar from "@/components/layout/topbar";
import Sidebar from "@/components/layout/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Types ---
interface Assignment {
  id: string;
  title: string;
  assignedOn: string;
  dueDate: string;
  category: string;
  submissions: number;
}
// --- Dummy Data ---
const initialAssignments: Assignment[] = [
  {
    id: "1",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
    category: "PHYSICS",
    submissions: 45,
  },
  {
    id: "2",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
    category: "PHYSICS",
    submissions: 45,
  },
  {
    id: "3",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
    category: "PHYSICS",
    submissions: 45,
  },
  {
    id: "4",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
    category: "PHYSICS",
    submissions: 45,
  },
  {
    id: "5",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
    category: "PHYSICS",
    submissions: 45,
  },
  {
    id: "6",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
    category: "PHYSICS",
    submissions: 45,
  },
  {
    id: "7",
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
    category: "PHYSICS",
    submissions: 45,
  },
];

const MainContent = () => {
  const [assignments, setAssignments] =
    useState<Assignment[]>(initialAssignments);
  const deleteAssignment = (id: string) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  return (
    <main className="flex-1 bg-[#F9F9F9] p-8 pb-12">
      <div className="mb-4">
        <div className="flex items-center gap-2 text-gray-400">
          {/* Green Dot */}
          <div className="w-4 h-4 bg-green-200 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>

          <h1 className="text-3xl font-bold text-[#2D2D2D] mb-1 tracking-tight">
            Assignments
          </h1>
        </div>

        <p className="text-gray-400 font-medium text-sm">
          Manage and create assignments for your classes.
        </p>
      </div>

      <div className="flex mb-4 w-full gap-4 items-center">
        <div className="flex items-center justify-between w-full gap-4 px-6 py-1 bg-white border border-gray-200/60 rounded-2xl text-gray-600 shadow-sm">
          {/* Left Side */}
          <div className="flex items-center gap-2 font-bold shrink-0">
            <Filter size={18} className="text-gray-400" />
            <span className="text-gray-400">Filter By</span>
          </div>

          {/* Right Side Search */}
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search Assignment"
              className="w-full pl-14 pr-6 py-3 border border-gray-200/60 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-[#EA580C] transition-all font-small text-gray-600"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="group relative rounded-[32px] bg-white px-6 py-2 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4 my-3">
              <h3 className="text-2xl font-extrabold text-[#2D2D2D] mb-6 group-hover:text-[#EA580C] transition-colors leading-tight">
                {assignment.title}
              </h3>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-300 hover:text-gray-500">
                    <MoreVertical size={20} />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 p-2 rounded-2xl border-gray-100 shadow-xl"
                >
                  <DropdownMenuItem className="flex items-center gap-2 p-3 rounded-xl cursor-pointer focus:bg-gray-50">
                    <ExternalLink size={16} />
                    <span className="font-semibold text-sm">
                      View Assignment
                    </span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => deleteAssignment(assignment.id)}
                    className="flex items-center gap-2 p-3 rounded-xl cursor-pointer focus:bg-red-50 text-red-600 focus:text-red-600"
                  >
                    <Trash2 size={16} />
                    <span className="font-semibold text-sm">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div>
              <div className="h-px w-full bg-white mb-6" />
              <div className="flex justify-between items-center text-[13px] font-bold">
                <div className="text-gray-400">
                  Assigned on :
                  <span className="text-gray-600">{assignment.assignedOn}</span>
                </div>
                <div className="text-gray-400">
                  Due :
                  <span className="text-gray-600">{assignment.dueDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 ml-35">
        <button className="bg-[#111111] hover:bg-black text-white px-8 py-2.5 rounded-full flex items-center gap-3 transition-all transform hover:scale-[1.05] active:scale-[0.95] shadow-2xl shadow-black/20">
          <Plus size={20} strokeWidth={3} />
          <span className="font-light tracking-tight">Create Assignment</span>
        </button>
      </div>
    </main>
  );
};

// --- Page Layout ---
export default function Page() {
  return (
    <div className="flex h-screen p-4 bg-[#F9F9F9] font-sans antialiased text-[#2D2D2D] overflow-hidden">
      {/* <Sidebar /> */}
      <div className="flex-1 p-2 flex flex-col min-w-0">
        {/* <Topbar /> */}
        <div className="flex-1 overflow-y-auto">
          <MainContent />
        </div>
      </div>
    </div>
  );
}
