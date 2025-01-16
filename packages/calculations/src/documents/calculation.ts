import type { DocumentWithTimestamps } from "@repo/mongo/document.ts";

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
