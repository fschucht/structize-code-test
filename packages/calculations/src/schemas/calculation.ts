import { InferRawDocType, Schema, SchemaDefinition } from "mongoose";
import { mongoConnection } from "@repo/mongo/connection";

export const CALCULATION_OPERATION = [
  "add",
  "subtract",
  "multiply",
  "divide",
] as const;

const schemaDefinition: SchemaDefinition = {
  operation: {
    type: String,
    enum: CALCULATION_OPERATION,
    isRequired: true,
  },
  numberA: {
    type: Number,
    isRequired: true,
  },
  numberB: {
    type: Number,
    isRequired: true,
  },
  result: {
    type: Number,
  },
};

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
