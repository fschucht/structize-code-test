import { InferRawDocType, Schema, SchemaDefinition } from "mongoose";
import { mongoConnection } from "@repo/mongo/connection";

export const COMPUTATION_OPERATION: readonly [
  "add",
  "subtract",
  "multiply",
  "divide",
] = ["add", "subtract", "multiply", "divide"];

const schemaDefinition: SchemaDefinition = {
  operation: {
    type: String,
    enum: COMPUTATION_OPERATION,
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

export type ComputationDocument = InferRawDocType<
  typeof schemaDefinition,
  {
    timestamps: true;
  }
>;

const schema = new Schema(schemaDefinition, {
  timestamps: true,
});

export const computationModel = mongoConnection.model("Computation", schema);
