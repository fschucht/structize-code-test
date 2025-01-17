import { Worker } from "bullmq";
import { ObjectId } from "mongodb";
import { CALCULATIONS_QUEUE_NAME } from "@repo/calculations/constants.ts";
import { redisConnection } from "@repo/redis/connection.ts";
import type { ComputeCalculationJob } from "@repo/calculations/jobs/computeCalculationJob.ts";
import { computeCalculation } from "@repo/calculations/services/calculations.ts";
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
    concurrency: 2, // This value is set to 2 for demonstration purposes.
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
