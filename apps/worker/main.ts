import { Worker } from "bullmq";
import { ObjectId } from "mongodb";
import { CALCULATIONS_QUEUE_NAME } from "@repo/calculations/constants";
import { redisConnection } from "@repo/redis/connection";
import type { ComputeCalculationJob } from "@repo/calculations/jobs/computeCalculationJob";
import { computeCalculation } from "@repo/calculations/services/calculations";
import { logger } from "@repo/logger/logger.ts";

const worker = new Worker<ComputeCalculationJob>(
  CALCULATIONS_QUEUE_NAME,
  async (job) => {
    logger.info({ job }, "Received job");

    const calculationId = ObjectId.createFromHexString(job.data.calculationId);
    await computeCalculation(calculationId);

    logger.info({ job }, "Handled job");
  },
  {
    connection: redisConnection,
    // For demonstration purposes, the concurrency is set to 2 here.
    concurrency: 2,
    autorun: false,
  },
);

process.on("exit", async () => {
  logger.info("Received exit signal for worker");

  if (!worker.isRunning()) {
    return;
  }

  await worker.close();

  logger.info("Closed worker");
});

logger.info({}, "Starting worker");
await worker.run();
