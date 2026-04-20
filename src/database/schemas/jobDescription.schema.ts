import { Schema } from "mongoose";

export const JobDescriptionSchema = new Schema(
  {
    jobTitle: { type: String, required: true },
    department: { type: String, required: true },
    description: { type: String, required: true, unique: true },
  },
  {
    timestamps: true
  }
);