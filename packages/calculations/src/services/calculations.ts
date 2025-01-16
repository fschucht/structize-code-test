import z from "zod";
import type { ObjectId } from "mongodb";
import {
  CALCULATION_OPERATION,
  type CalculationDocument,
} from "../documents/calculation.ts";
import { calculationsQueue } from "../queues/calculations.ts";
import { calculationModel } from "../models/calculation.ts";
import { setTimeout } from "node:timers/promises";

export const createCalculationParamsSchema = z.object({
  operation: z.enum(CALCULATION_OPERATION),
  numberA: z.number(),
  numberB: z
    .number()
    .refine((numberB) => numberB !== 0, "numberB cannot equal 0"),
});

export type CreateCalculationParams = z.infer<
  typeof createCalculationParamsSchema
>;

export async function createCalculation(
  params: CreateCalculationParams,
): Promise<CalculationDocument> {
  const createdCalculation = await calculationModel.create(params);

  await calculationsQueue.add("compute", {
    calculationId: createdCalculation._id.toString(),
  });

  return createdCalculation;
}

export async function findCalculationById(
  calculationId: ObjectId,
): Promise<CalculationDocument> {
  const calculation = await calculationModel.findById(calculationId);

  if (!calculation) {
    throw new Error("Calculation not found");
  }

  return calculation;
}

export async function computeCalculation(
  calculationId: ObjectId,
): Promise<void> {
  const calculation = await calculationModel.findById(calculationId);

  if (!calculation) {
    throw new Error("Calculation not found");
  }

  await setTimeout(3_000);

  let result: number;

  switch (calculation.operation) {
    case "add": {
      result = calculation.numberA + calculation.numberB;
      break;
    }

    case "subtract": {
      result = calculation.numberA - calculation.numberB;
      break;
    }

    case "multiply": {
      result = calculation.numberA * calculation.numberB;
      break;
    }

    case "divide": {
      result = calculation.numberA / calculation.numberB;
      break;
    }
  }

  await calculationModel.updateOne(
    {
      _id: calculationId,
    },
    {
      $set: {
        result,
      },
    },
  );
}
