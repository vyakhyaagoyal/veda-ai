"use client";

import { useEffect } from "react";

import { useSocketStore }
  from "@/store/socket.store";

export const useGenerationSocket =
  ({
    assignmentId,
    onComplete,
    onFailed,
  }: {
    assignmentId: string;

    onComplete: () => void;

    onFailed: () => void;
  }) => {
    const {
      socket,
      connect,
    } = useSocketStore();

    // connect once
    useEffect(() => {
      if (!socket) {
        connect();
      }
    }, []);

    useEffect(() => {
      if (!socket) return;

      socket.on(
        "generation-progress",
        (data) => {
          console.log(
            "Generating:",
            data
          );
        }
      );

      

      socket.on(
        "generation-complete",
        (data) => {
          if (
            data.assignmentId ===
            assignmentId
          ) {
            onComplete();
          }
        }
      );

      socket.on(
        "generation-failed",
        (data) => {
          if (
            data.assignmentId ===
            assignmentId
          ) {
            onFailed();
          }
        }
      );

      return () => {
        socket.off(
          "generation-progress"
        );

        socket.off(
          "generation-complete"
        );

        socket.off(
          "generation-failed"
        );
      };
    }, [socket]);
  };