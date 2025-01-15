import { InferRawDocType, Schema } from "mongoose";
import { mongoConnection } from "@repo/mongo/connection";

export const COMPUTATION_OPERATION: readonly [
  "add",
  "subtract",
  "multiply",
  "divide",
] = ["add", "subtract", "multiply", "divide"];

const schemaDefinition = {
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

export type ComputationDocument = InferRawDocType<typeof schemaDefinition>;

const schema = new Schema(schemaDefinition);

export const computationModel = mongoConnection.model("Computation", schema);
