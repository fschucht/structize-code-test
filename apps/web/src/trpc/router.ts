import { initTRPC } from "@trpc/server";
import {
  createComputation,
  createComputationParamsSchema,
} from "@repo/computations/services/computations";

const trpc = initTRPC.create();

export const apiRouter = trpc.router({
  createComputation: trpc.procedure
    .input(createComputationParamsSchema)
    .mutation(async ({ input }) => {
      await createComputation(input);
    }),
});

export type ApiRouter = typeof apiRouter;
