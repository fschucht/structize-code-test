import z from "zod";
import {
  CALCULATION_OPERATION,
  CalculationDocument,
  calculationModel,
} from "../schemas/calculation";

export const createCalculationParamsSchema = z.object({
  operation: z.enum(CALCULATION_OPERATION),
  numberA: z.number(),
  numberB: z.number(),
});

export type CreateCalculationParams = z.infer<
  typeof createCalculationParamsSchema
>;

export async function createCalculation(
  params: CreateCalculationParams,
): Promise<CalculationDocument> {
  return calculationModel.create(params);
}
