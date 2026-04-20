import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});

export const parseResumeWithGemini = async (text: any) => {
    const prompt = `
You are an AI recruiter assistant.

Extract structured data from this resume.

IMPORTANT RULES:
- Return ONLY valid JSON
- NO markdown
- NO \`\`\`json
- NO explanations

Schema:
{
  "firstName": string,
  "lastName": string,
  "email": string,
  "headline": string,
  "bio": string,
  "location": string,
  "skills": [
    {
      "name": string,
      "level": "Beginner" | "Intermediate" | "Advanced" | "Expert",
      "yearsOfExperience": number
    }
  ],
  "experience": [
    {
      "company": string,
      "role": string,
      "startDate": string,
      "endDate": string,
      "description": string,
      "technologies": string[],
      "isCurrent": boolean
    }
  ],
  "education": [
    {
      "institution": string,
      "degree": string,
      "fieldOfStudy": string,
      "startYear": number,
      "endYear": number
    }
  ],
  "projects": [],
  "availability": {
    "status": "Available" | "Open to Opportunities" | "Not Available",
    "type": "Full-time" | "Part-time" | "Contract"
  },
  "socialLinks": {
    "linkedin": string,
    "github": string,
    "portfolio": string
  }
}

Resume:
"""
${text}
"""
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const raw = response.text();

    const cleaned = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const match = cleaned.match(/\{[\s\S]*\}/);

    if (!match) {
        throw new Error("Gemini did not return valid JSON");
    }

    const parsed = JSON.parse(match[0]);

    return parsed;
};