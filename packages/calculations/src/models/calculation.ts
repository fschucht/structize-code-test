import { calculationSchema } from "../schemas/calculation.ts";
import { mongoConnection } from "@repo/mongo/connection";

export const calculationModel = mongoConnection.model(
  "Calculation",
  calculationSchema,
);
