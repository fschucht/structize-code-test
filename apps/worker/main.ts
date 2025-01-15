import { Worker } from "bullmq";
import {ObjectId} from 'mongodb'
import { CALCULATIONS_QUEUE_NAME } from '@repo/calculations/constants'
import { redisConnection } from "@repo/redis/connection";
import { ComputeCalculationJob } from "@repo/calculations/jobs/computeCalculationJob";
import { computeCalculation } from "@repo/calculations/services/calculations";

const worker = new Worker<ComputeCalculationJob>(CALCULATIONS_QUEUE_NAME, async (job) => {
  await computeCalculation(ObjectId.createFromHexString(job.data.data.calculationId))
}, {
  connection: redisConnection,
  // For demonstration purposes, the concurrency is set to 2 here.
  concurrency: 2
});

process.on('exit', async () => {
  if (!worker.isRunning()) {
    return
  }

  await worker.close()
})

if (!worker.isRunning()) {
  await worker.run()
}