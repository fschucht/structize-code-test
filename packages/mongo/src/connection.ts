import mongoose from "mongoose";
import { z } from "zod";

const configSchema = z.object({
  MONGODB_URI: z.string().default("mongodb://localhost:27017/structize"),
});
const config = configSchema.parse(process.env);

export const mongoConnection = await mongoose.connect(config.MONGODB_URI);
