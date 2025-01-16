import { Job, Queue, QueueEvents } from "bullmq";
import { redisConnection } from "@repo/redis/connection.ts";
import { CALCULATIONS_QUEUE_NAME } from "../constants.ts";
import type { ComputeCalculationJob } from "../jobs/computeCalculationJob.ts";

export const calculationsQueue = new Queue<ComputeCalculationJob>(
  CALCULATIONS_QUEUE_NAME,
  {
    connection: redisConnection,
  },
);

export const calculationsQueueEvents = new QueueEvents(
  CALCULATIONS_QUEUE_NAME,
  {
    connection: redisConnection,
  },
);

export async function getCalculationsJobById(
  jobId: string,
): Promise<Job<ComputeCalculationJob> | undefined> {
  return Job.fromId(calculationsQueue, jobId);
}
