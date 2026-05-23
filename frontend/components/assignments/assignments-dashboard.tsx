"use client";

import React, { useEffect, useMemo } from "react";
import AssignmentsZero from "@/components/assignments/assignments-zero";
import {
  Plus,
  MoreVertical,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  Loader2,
} from "lucide-react";

import { useRouter } from "next/navigation";

import Sidebar from "@/components/layout/sidebar";

import Topbar from "@/components/layout/topbar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { assignmentService } from "@/services/assignment.service";

import { useAssignmentStore } from "@/store/assignment.store";

export default function Page() {
  const router = useRouter();

  const {
    assignments,
    setAssignments,
    removeAssignment,
    loading,
    setLoading,
    search,
    setSearch,
  } = useAssignmentStore();

  // FETCH ASSIGNMENTS
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);

        const data = await assignmentService.getAssignments();

        setAssignments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // DELETE
  const handleDelete = async (id: string) => {
    try {
      removeAssignment(id);

      await assignmentService.deleteAssignment(id);
    } catch (error) {
      console.error(error);
    }
  };

  // SEARCH
  const filteredAssignments = useMemo(() => {
    if (!Array.isArray(assignments)) return [];

    return assignments.filter((assignment) =>
      assignment.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [assignments, search]);

  return (
    <div className="flex h-screen p-2 bg-[#F9F9F9] overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 flex flex-col overflow-hidden bg-[#F9F9F9] p-2">
  {loading ? (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin text-zinc-400" />
    </div>
  ) : !assignments?.length ? (
    <AssignmentsZero
      onCreate={() =>
        router.push("/assignments/create")
      }
    />
  ) : (
    <>
      {/* HEADER */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#2D2D2D]">
            Assignments
          </h1>
        </div>

        <p className="text-zinc-500 text-sm mt-2">
          Manage and create assignments
          for your classes.
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <div className="flex items-center justify-between bg-white border border-zinc-200/60 rounded-2xl px-6 py-3 shadow-sm">
          <div className="flex items-center gap-2 text-zinc-500 font-medium">
            <Filter size={18} />
            Filter By
          </div>

          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type="text"
              placeholder="Search Assignment"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-full border border-zinc-200 py-3 pl-14 pr-5 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto pr-2">
        {filteredAssignments.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-zinc-700">
                No matching assignments
              </h2>

              <p className="text-zinc-500 mt-2">
                Try adjusting your search.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 pb-10">
            {filteredAssignments.map(
              (assignment) => (
                <div
                  key={assignment._id}
                  className="group bg-white rounded-[32px] p-6 border border-zinc-200/60 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  {/* CARD CONTENT */}
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* FAB */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <button
          onClick={() =>
            router.push(
              "/assignments/create"
            )
          }
          className="bg-[#111111] hover:bg-black text-white px-8 py-3 rounded-full flex items-center gap-3 shadow-2xl transition-all duration-300 hover:scale-[1.03]"
        >
          <Plus size={20} />
          Create Assignment
        </button>
      </div>
    </>
  )}
</main>
      </div>
    </div>
  );
}
