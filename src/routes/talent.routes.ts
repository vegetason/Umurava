import express from "express";
import { generateData } from "../controllers/generateDataFromResume.controller";
import { uploadResumes } from "../services/multer.service";

let TalentRouter = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Skill:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Node.js"
 *         level:
 *           type: string
 *           enum: [Beginner, Intermediate, Advanced, Expert]
 *           example: "Advanced"
 *         yearsOfExperience:
 *           type: number
 *           example: 3
 *
 *     Experience:
 *       type: object
 *       properties:
 *         company:
 *           type: string
 *           example: "Tech Corp"
 *         role:
 *           type: string
 *           example: "Backend Developer"
 *         startDate:
 *           type: string
 *           example: "2021"
 *         endDate:
 *           type: string
 *           example: "2024"
 *         description:
 *           type: string
 *           example: "Built REST APIs and microservices."
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Node.js", "PostgreSQL"]
 *         isCurrent:
 *           type: boolean
 *           example: false
 *
 *     Education:
 *       type: object
 *       properties:
 *         institution:
 *           type: string
 *           example: "University of Rwanda"
 *         degree:
 *           type: string
 *           example: "BSc"
 *         fieldOfStudy:
 *           type: string
 *           example: "Computer Science"
 *         startYear:
 *           type: number
 *           example: 2017
 *         endYear:
 *           type: number
 *           example: 2021
 *
 *     Project:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Portfolio Website"
 *         description:
 *           type: string
 *           example: "Personal portfolio built with Next.js."
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Next.js", "Tailwind CSS"]
 *         role:
 *           type: string
 *           example: "Solo Developer"
 *         link:
 *           type: string
 *           example: "https://johndoe.dev"
 *
 *     TalentProfile:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "664f1a2b3c4d5e6f7a8b9c0d"
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john@example.com"
 *         headline:
 *           type: string
 *           example: "Full Stack Developer"
 *         bio:
 *           type: string
 *           example: "Experienced software engineer."
 *         location:
 *           type: string
 *           example: "Kigali, Rwanda"
 *         skills:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Skill'
 *         experience:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Experience'
 *         education:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Education'
 *         projects:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Project'
 *         availability:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum: [Available, "Open to Opportunities", "Not Available"]
 *               example: "Open to Opportunities"
 *             type:
 *               type: string
 *               enum: [Full-time, Part-time, Contract]
 *               example: "Full-time"
 *         socialLinks:
 *           type: object
 *           properties:
 *             linkedin:
 *               type: string
 *               example: "https://linkedin.com/in/johndoe"
 *             github:
 *               type: string
 *               example: "https://github.com/johndoe"
 *             portfolio:
 *               type: string
 *               example: "https://johndoe.dev"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "An error occurred"
 *         error:
 *           type: object
 *           description: "Detailed error info (only in development mode)"
 */

/**
 * @openapi
 * /api/talent/getData:
 *   post:
 *     tags:
 *       - Talent
 *     summary: Upload resumes and generate talent profiles
 *     description: |
 *       Accepts one or more resume files (PDF or DOCX), extracts their text,
 *       parses structured data using Gemini AI, and saves each as a talent profile.
 *
 *       **Constraints:**
 *       - Accepted formats: `.pdf` and `.docx` only
 *       - Maximum of **20 files** per request
 *       - Field name must be `resumes`
 *     operationId: generateDataFromResumes
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - resumes
 *             properties:
 *               resumes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 minItems: 1
 *                 maxItems: 20
 *                 description: "PDF or DOCX resume files. Max 20 files."
 *     responses:
 *       200:
 *         description: Resumes parsed and talent profiles saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   saved:
 *                     $ref: '#/components/schemas/TalentProfile'
 *       400:
 *         description: No files uploaded, unsupported file type, or file limit exceeded.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               noFiles:
 *                 summary: No files uploaded
 *                 value:
 *                   message: "No files uploaded"
 *               unsupportedType:
 *                 summary: Unsupported file type
 *                 value:
 *                   message: "Only PDF and DOCX files are supported"
 *               tooManyFiles:
 *                 summary: Exceeded file limit
 *                 value:
 *                   warning: "Maximum upload limit reached. You can only upload up to 20 files at a time."
 *       500:
 *         description: Server error during AI parsing or database save.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Internal Server Error"
 *               error: {}
 */
TalentRouter.post("/getData", uploadResumes, generateData);

export default TalentRouter;