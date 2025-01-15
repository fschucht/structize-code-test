import { Queue } from "bullmq";
import { CALCULATIONS_QUEUE_NAME } from "../constants";
import { redisConnection } from "@repo/redis/connection";
import { ComputeCalculationJob } from "../jobs/computeCalculationJob";

export const calculationsQueue = new Queue<ComputeCalculationJob>(
  CALCULATIONS_QUEUE_NAME,
  {
    connection: redisConnection,
  },
);
