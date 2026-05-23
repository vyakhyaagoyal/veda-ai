"use client";

import { useEffect } from "react";

import { assignmentService }
  from "@/services/assignment.service";

import { useAssignmentStore }
  from "@/store/assignment.store";

export const useAssignments = () => {
  const {
    assignments,
    setAssignments,
    loading,
    setLoading,
    // error,
    // setError,
  } = useAssignmentStore();

  const fetchAssignments =
    async () => {
      try {
        setLoading(true);

        const data =
          await assignmentService.getAssignments();

        setAssignments(data);
      } catch (error) {
        // setError(
        //   "Failed to fetch assignments"
        // );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return {
    assignments,
    loading,
    // error,
    fetchAssignments,
  };
};