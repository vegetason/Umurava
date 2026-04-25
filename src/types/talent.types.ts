export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExperience: number;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  isCurrent: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  role: string;
  link: string;
}
export type TalentStatus =
  | "Pending"
  | "Screened"
  | "Shortlisted"
  | "Emailed"
  | "Rejected";
export interface TalentProfileType {
  firstName: string;
  lastName: string;
  email: string;
  headline: string;
  bio?: string;
  location: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  availability: {
    status: "Available" | "Open to Opportunities" | "Not Available";
    type: "Full-time" | "Part-time" | "Contract";
  };
  socialLinks: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  talentScore:TalentScore;
  jobDescription?: string | null;
  status:TalentStatus
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TalentScore {
    overallScore: number;
    breakdown: {
        skills: number;
        experience: number;
        education: number;
        projects: number;
        profileCompleteness: number;
    };
    summary: string;
}