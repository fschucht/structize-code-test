import { initTRPC } from "@trpc/server";
import {
  createCalculation,
  createCalculationParamsSchema,
  findCalculationById,
} from "@repo/calculations/services/calculations";
import { on } from "node:events";
import { ObjectId } from "mongodb";
import {
  calculationsQueueEvents,
  getCalculationsJobById,
} from "@repo/calculations/queues/calculations";

const trpc = initTRPC.create();

export const apiRouter = trpc.router({
  createCalculation: trpc.procedure
    .input(createCalculationParamsSchema)
    .subscription(async function* ({ input, signal }) {
      const createdCalculation = await createCalculation(input);

      yield createdCalculation;

      for await (const [event] of on(calculationsQueueEvents, "completed", {
        signal: signal,
      })) {
        if ("jobId" in event && typeof event.jobId === "string") {
          const job = await getCalculationsJobById(event.jobId);

          if (job?.data.calculationId === createdCalculation._id.toString()) {
            const updatedCalculation = await findCalculationById(
              ObjectId.createFromHexString(createdCalculation._id.toString()),
            );

            yield updatedCalculation;
            return;
          }
        }
      }
    }),
});

export type ApiRouter = typeof apiRouter;
