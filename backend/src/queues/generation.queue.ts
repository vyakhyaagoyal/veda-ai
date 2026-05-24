import { Queue } from "bullmq";

import { redis } from "../config/redis";

export const generationQueue =
  new Queue(
    "assignment-generation",
    {
      connection: redis,
    }
  );