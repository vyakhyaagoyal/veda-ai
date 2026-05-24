import { create } from "zustand";

import { io }
  from "socket.io-client";

interface SocketStore {
  socket: any;

  connect: () => void;
}

export const useSocketStore =
  create<SocketStore>(
    (set) => ({
      socket: null,

      connect: () => {
        const socket = io(
          process.env
            .NEXT_PUBLIC_SOCKET_URL!
        );

        set({ socket });
      },
    })
  );