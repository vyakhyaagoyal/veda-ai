import { Server } from "socket.io";

let io: Server;

export const initSocket =
  (server: any) => {
    io = new Server(server, {
      cors: {
        origin: [
      "http://localhost:3000",

      "https://veda-ai-murex-seven.vercel.app",
    ],
    credentials: true,
  },
    });

    io.on(
      "connection",
      (socket) => {
        console.log(
          "Socket Connected"
        );
      }
    );
  };

export const getIO = () => io;