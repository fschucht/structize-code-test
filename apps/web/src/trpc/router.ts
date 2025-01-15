import { initTRPC } from "@trpc/server";
import {
  createCalculation,
  createCalculationParamsSchema,
} from "@repo/calculations/services/calculations";

const trpc = initTRPC.create();

export const apiRouter = trpc.router({
  createCalculation: trpc.procedure
    .input(createCalculationParamsSchema)
    .mutation(async ({ input }) => {
      await createCalculation(input);
    }),
});

export type ApiRouter = typeof apiRouter;
