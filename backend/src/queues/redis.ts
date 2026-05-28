import IORedis from "ioredis";

const isProduction =
  process.env.NODE_ENV === "production";

export const redisConnection =
  isProduction
    ? new IORedis(
        process.env.REDIS_URL as string,
        {
          maxRetriesPerRequest: null,
        }
      )
    : new IORedis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),

        maxRetriesPerRequest: null,
      });

redisConnection.ping().then(console.log);