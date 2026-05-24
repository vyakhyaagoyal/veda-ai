import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import http from "http";

import assignmentRoutes
  from "./routes/assignment.routes";

import { connectDB }
  from "./config/db";

import { initSocket }
  from "./sockets/socket";

import "./workers/generation.worker";

dotenv.config();

connectDB();

const app = express();

const server =
  http.createServer(app);

initSocket(server);

app.use(cors());

app.use(express.json());

app.use(
  "/assignments",
  assignmentRoutes
);

server.listen(
  process.env.PORT,
  () => {
    console.log(
      "Server Running"
    );
  }
);