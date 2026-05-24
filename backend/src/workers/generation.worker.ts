import { Worker } from "bullmq";
import { redisConnection } from "../queues/redis";

new Worker(
  "assignment-generation",
  async (job) => {
    console.log(job.data);
  },
  {
    connection: redisConnection,
  }
);