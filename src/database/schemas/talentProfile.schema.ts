import { Schema } from "mongoose";

export const TalentProfileSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    headline: { type: String, required: true },
    bio: { type: String },
    location: { type: String, required: true },

    skills: [
      {
        name: String,
        level: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced", "Expert"]
        },
        yearsOfExperience: Number
      }
    ],

    experience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
        technologies: [String],
        isCurrent: Boolean
      }
    ],

    education: [
      {
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number
      }
    ],

    projects: [
      {
        name: String,
        description: String,
        technologies: [String],
        role: String,
        link: String
      }
    ],

    availability: {
      status: {
        type: String,
        enum: ["Available", "Open to Opportunities", "Not Available"]
      },
      type: {
        type: String,
        enum: ["Full-time", "Part-time", "Contract"]
      }
    },

    socialLinks: {
      linkedin: String,
      github: String,
      portfolio: String
    }
  },
  {
    timestamps: true
  }
);