import mongoose from "mongoose";
import { JobDescriptionSchema } from "../schemas/jobDescription.schema";

const JobDescription = mongoose.model(
  "JobDescription",
  JobDescriptionSchema
);

export default JobDescription;