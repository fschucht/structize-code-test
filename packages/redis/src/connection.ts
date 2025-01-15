import { Redis } from "ioredis";
import { config } from "./config.ts";

export const redisConnection = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  maxRetriesPerRequest: null,
});
