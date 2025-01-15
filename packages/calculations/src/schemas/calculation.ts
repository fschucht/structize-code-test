import { type InferRawDocType, Schema, SchemaDefinition } from "mongoose";
import { mongoConnection } from "@repo/mongo/connection";

export const CALCULATION_OPERATION = [
  "add",
  "subtract",
  "multiply",
  "divide",
] as const;

const schemaDefinition = {
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
} satisfies SchemaDefinition;

export type CalculationDocument = InferRawDocType<
  typeof schemaDefinition,
  {
    timestamps: true;
  }
>;

const schema = new Schema(schemaDefinition, {
  timestamps: true,
});

export const calculationModel = mongoConnection.model("Calculation", schema);
