import dotenv from "dotenv";
dotenv.config();

import "./workers/generation.worker";

import express from "express";
import cors from "cors";
import http from "http";

import assignmentRoutes from "./routes/assignment.routes";

import { connectDB } from "./config/db";
import { initSocket } from "./sockets/socket";
import notificationRoutes
  from "./routes/notification.routes";

import "./workers/generation.worker";

connectDB();

const app = express();

const server = http.createServer(app);

initSocket(server);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://veda-ai-murex-seven.vercel.app",
    ],

    credentials: true,
  })
);

app.use(express.json());

app.use("/assignments", assignmentRoutes);


app.use(
  "/notifications",
  notificationRoutes
);

server.listen(process.env.PORT, () => {
  console.log("Server Running");
});