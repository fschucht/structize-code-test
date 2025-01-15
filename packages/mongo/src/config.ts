import { z } from "zod";

const configSchema = z.object({
  MONGODB_URI: z.coerce.string().default("mongodb://localhost:27017/structize"),
});

export const config = configSchema.parse(process.env);
