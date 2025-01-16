import type { Model } from "mongoose";
import {
  calculationSchema,
  type CalculationDocument,
} from "../schemas/calculation.ts";
import { mongooseConnection } from "@repo/mongo/connection";

export const calculationModel: Model<CalculationDocument> =
  (mongooseConnection.models.Calculation as Model<CalculationDocument>) ||
  mongooseConnection.model("Calculation", calculationSchema);
