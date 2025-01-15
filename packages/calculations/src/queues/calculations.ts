import { Queue } from "bullmq";
import { CALCULATIONS_QUEUE_NAME } from "../constants.ts";
import { redisConnection } from "@repo/redis/connection";
import type { ComputeCalculationJob } from "../jobs/computeCalculationJob.ts";

export const calculationsQueue = new Queue<ComputeCalculationJob>(
  CALCULATIONS_QUEUE_NAME,
  {
    connection: redisConnection,
  },
);
