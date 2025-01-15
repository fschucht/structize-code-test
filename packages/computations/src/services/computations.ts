import z from "zod";
import {
  COMPUTATION_OPERATION,
  ComputationDocument,
  computationModel,
} from "../schemas/computation";

export const createComputationParamsSchema = z.object({
  operation: z.enum(COMPUTATION_OPERATION),
  numberA: z.number(),
  numberB: z.number(),
});

export type CreateComputationParams = z.infer<
  typeof createComputationParamsSchema
>;

export async function createComputation(
  params: CreateComputationParams,
): Promise<ComputationDocument> {
  return computationModel.create(params);
}
