"use client";

import React, { useEffect, useMemo, useState } from "react";
import AssignmentsZero from "@/components/assignments/assignments-zero";
import { Plus, Search, Filter, Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";

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
  const [searchInput, setSearchInput] = useState("");

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

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

    const query = search.toLowerCase().trim();

    if (!query) return assignments;

    return assignments.filter((assignment) => {
      const title = (assignment.title || "").toLowerCase();

      const status = (assignment.status || "").toLowerCase();

      const date = new Date(assignment.dueDate).toLocaleDateString();

      return (
        title.includes(query) || status.includes(query) || date.includes(query)
      );
    });
  }, [assignments, search]);

  return (
    <div className="flex min-h-screen p-2 bg-[#F9F9F9]">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 flex flex-col bg-[#F9F9F9] p-2">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="animate-spin text-black" />
            </div>
          ) : !assignments?.length ? (
            <AssignmentsZero
              onCreate={() => router.push("/assignments/create")}
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
                  Manage and create assignments for your classes.
                </p>
              </div>

              {/* SEARCH */}
              <div className="mb-6 space-y-4">
                {/* SEARCH BAR */}
                <div className="flex items-center justify-between bg-white border border-zinc-200/60 rounded-2xl px-6 py-4 shadow-sm">
                  {/* LEFT */}
                  <div className="flex items-center gap-2 text-zinc-500 font-medium">
                    <Filter size={18} />
                    <span>Filter By</span>
                  </div>

                  {/* RIGHT */}
                  <div className="relative w-full max-w-md">
                    <Search
                      size={18}
                      className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-zinc-400
        "
                    />

                    <input
                      type="text"
                      placeholder="Search assignments..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="
          w-full
          rounded-full
          border
          border-zinc-200
          bg-zinc-50
          py-3
          pl-14
          pr-12
          text-sm
          transition-all
          focus:outline-none
          focus:ring-2
          focus:ring-orange-500/10
          focus:border-orange-500
          focus:bg-white
        "
                    />

                    {/* CLEAR BUTTON */}
                    {searchInput && (
                      <button
                        onClick={() => {
                          setSearchInput("");
                          setSearch("");
                        }}
                        className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-zinc-400
            hover:text-black
            transition-colors
          "
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* RESULTS INFO */}
                <div className="flex items-center justify-between px-1">
                  <p className="text-sm text-zinc-500">
                    Showing{" "}
                    <span className="font-semibold text-black">
                      {filteredAssignments.length}
                    </span>{" "}
                    assignments
                  </p>

                  {search && (
                    <p className="text-sm text-zinc-400">
                      Results for{" "}
                      <span className="font-medium text-black">"{search}"</span>
                    </p>
                  )}
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex-1 pr-2">
                {filteredAssignments.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-zinc-700">
                        No assignments found
                      </h2>

                      <p className="text-zinc-500 mt-2">
                        Try searching by title, status, or due date.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 pb-10">
                    {filteredAssignments.map((assignment) => (
                      <div
                        key={assignment._id}
                        onClick={(e) => {
                          e.stopPropagation();

                          router.push(`/assignments/${assignment._id}`);
                        }}
                        className="
    group
    bg-white
    rounded-[32px]
    p-6
    border
    border-zinc-200/60
    shadow-sm
    hover:-translate-y-1
    hover:shadow-md
    transition-all
    duration-300
    cursor-pointer
  "
                      >
                        {/* CARD CONTENT */}
                        <div className="flex flex-col h-full justify-between">
                          {/* TOP */}
                          <div className="flex items-start justify-between">
                            <h2 className="text-[30px] font-bold tracking-tight text-[#2D2D2D] leading-tight">
                              {assignment.title || "Untitled Assignment"}
                            </h2>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-zinc-400 hover:text-zinc-600 transition-colors"
                                >
                                  ⋮
                                </button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent
                                align="end"
                                className="
    w-52
    rounded-2xl
    border
    border-zinc-200
    shadow-2xl
    p-3
    bg-white
  "
                              >
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  onClick={(e) => {
                                    e.stopPropagation();

                                    router.push(
                                      `/assignments/${assignment._id}`,
                                    );
                                  }}
                                >
                                  View Assignment
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  onClick={(e) => {
                                    e.stopPropagation();

                                    handleDelete(assignment._id);
                                  }}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {/* BOTTOM */}
                          <div className="flex items-center justify-between mt-10">
                            <div className="text-sm text-zinc-500">
                              <span className="font-semibold text-black">
                                Assigned on :
                              </span>{" "}
                              {new Date(
                                assignment.createdAt,
                              ).toLocaleDateString()}
                            </div>

                            <div className="text-sm text-zinc-500">
                              <span className="font-semibold text-black">
                                Due :
                              </span>{" "}
                              {new Date(
                                assignment.dueDate,
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FAB */}
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
                <button
                  onClick={() => router.push("/assignments/create")}
                  className="bg-[#111111] cursor-pointer hover:bg-black text-white px-8 py-3 rounded-full flex items-center gap-3 shadow-2xl transition-all duration-300 hover:scale-[1.03]"
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
