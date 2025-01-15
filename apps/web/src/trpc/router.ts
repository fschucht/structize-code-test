import { initTRPC } from "@trpc/server";
import { z } from "zod";

const trpc = initTRPC.create();

export const apiRouter = trpc.router({
  createComputation: trpc.procedure
    .input(
      z.object({
        operation: z.enum(["add", "subtract", "multiply", "divide"]),
        numberA: z.number(),
        numberB: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      console.log(input);
    }),
});

export type ApiRouter = typeof apiRouter;
