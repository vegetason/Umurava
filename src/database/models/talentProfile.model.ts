import mongoose from "mongoose";
import { TalentProfileSchema } from "../schemas/talentProfile.schema";

const TalentProfile = mongoose.model(
  "TalentProfile",
  TalentProfileSchema
);

export default TalentProfile;