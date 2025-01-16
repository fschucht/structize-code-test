import mongoose from "mongoose";
import { config } from "./config.ts";

export const mongooseConnection = await mongoose.connect(config.MONGODB_URI);
