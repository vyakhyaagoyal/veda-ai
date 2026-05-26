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

import authRoutes
  from "./routes/auth.routes";

  import cookieParser
  from "cookie-parser";

connectDB();

const app = express();

const server = http.createServer(app);

initSocket(server);

app.use(
  cors({
    origin: [
      "https://veda-ai-murex-seven.vercel.app",
    ],

    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/assignments", assignmentRoutes);


app.use(
  "/notifications",
  notificationRoutes
);

app.use(
  "/auth",
  authRoutes
);

server.listen(process.env.PORT, () => {
  console.log("Server Running");
});