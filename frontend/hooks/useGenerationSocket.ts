"use client";

import { useEffect }
  from "react";

import { useSocketStore }
  from "@/store/socket.store";

export const useGenerationSocket =
  ({
    assignmentId,
    onComplete,
  }: {
    assignmentId: string;

    onComplete: () => void;
  }) => {
    const {
      socket,
      connect,
    } = useSocketStore();

    useEffect(() => {
      if (!socket) {
        connect();
      }
    }, []);

    useEffect(() => {
      if (!socket) return;

      socket.on(
        "generation-progress",
        (data: any) => {
          console.log(data);
        }
      );

      socket.on(
        "generation-complete",
        (data: any) => {
          if (
            data.assignmentId ===
            assignmentId
          ) {
            onComplete();
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
      };
    }, [socket]);
  };