import { Schema } from "mongoose";
import type { DocumentWithTimestamps } from "@repo/mongo/document";

export const CALCULATION_OPERATION = [
  "add",
  "subtract",
  "multiply",
  "divide",
] as const;
export type CalculationOperation = "add" | "subtract" | "multiply" | "divide";

export interface CalculationDocument extends DocumentWithTimestamps {
  operation: CalculationOperation;
  numberA: number;
  numberB: number;
  result?: number;
}

export const calculationSchema = new Schema<CalculationDocument>(
  {
    operation: {
      type: String,
      enum: CALCULATION_OPERATION,
      required: true,
    },
    numberA: {
      type: Number,
      required: true,
    },
    numberB: {
      type: Number,
      required: true,
    },
    result: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);
