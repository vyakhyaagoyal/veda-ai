import { Server } from "socket.io";

let io: Server;

export const initSocket =
  (server: any) => {
    io = new Server(server, {
      cors: {
        origin:
          process.env.CLIENT_URL,
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