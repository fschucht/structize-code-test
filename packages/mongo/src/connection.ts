import mongoose from "mongoose";
import { config } from "./config.ts";

export const mongoConnection = await mongoose.connect(config.MONGODB_URI);
