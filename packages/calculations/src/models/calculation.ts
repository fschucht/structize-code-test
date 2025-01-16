import { Schema, type Model } from "mongoose";
import { mongooseConnection } from "@repo/mongo/connection.ts";
import {
  CALCULATION_OPERATION,
  type CalculationDocument,
} from "../documents/calculation.ts";

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

export const calculationModel: Model<CalculationDocument> =
  (mongooseConnection.models.Calculation as Model<CalculationDocument>) ||
  mongooseConnection.model("Calculation", calculationSchema);
