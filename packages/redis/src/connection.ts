import { Redis } from "ioredis";
import { z } from "zod";

const configSchema = z.object({
  REDIS_HOST: z.coerce.string().default("localhost"),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
});
const config = configSchema.parse(process.env);

export const redisConnection = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  maxRetriesPerRequest: null,
});
