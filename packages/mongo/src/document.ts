import type { ObjectId } from "mongodb";

export interface Document {
  _id: ObjectId;
}

export interface DocumentWithTimestamps extends Document {
  createdAt: Date;
  updatedAt: Date;
}
