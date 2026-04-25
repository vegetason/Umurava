import express from "express";
import { generateData } from "../controllers/generateDataFromResume.controller";
import { uploadResumes } from "../services/multer.service";
import { generateScoreForAllTalents, generateScoreForOneTalent } from "../controllers/generateScore.controller";
import { deleteTheTalent, deleteTalentsByJobDescriptionController, getTalentInfo, getTalents, getTalentsByStatusController, updateTalentStatusController } from "../controllers/talentProfile.controller";

let TalentRouter = express.Router();

TalentRouter.post("/getData", uploadResumes, generateData);
TalentRouter.post('/generateScore', generateScoreForOneTalent);
TalentRouter.get('/getTalentInfo', getTalentInfo);
TalentRouter.get('/getTalents', getTalents);
TalentRouter.post('/generateScoreForAll', generateScoreForAllTalents);
TalentRouter.delete('/deleteTalentsByJobDescription', deleteTalentsByJobDescriptionController);
TalentRouter.delete('/deleteTalent', deleteTheTalent);
TalentRouter.get('/getTalentByStatus',getTalentsByStatusController)
TalentRouter.put('/updateTalentStatus',updateTalentStatusController)

export default TalentRouter;

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
 *     TalentScoreBreakdown:
 *       type: object
 *       properties:
 *         skills:
 *           type: number
 *           example: 85
 *         experience:
 *           type: number
 *           example: 78
 *         education:
 *           type: number
 *           example: 90
 *         projects:
 *           type: number
 *           example: 70
 *         profileCompleteness:
 *           type: number
 *           example: 95
 *
 *     TalentScore:
 *       type: object
 *       properties:
 *         overallScore:
 *           type: number
 *           example: 82
 *         breakdown:
 *           $ref: '#/components/schemas/TalentScoreBreakdown'
 *         summary:
 *           type: string
 *           example: "Strong candidate with relevant backend experience."
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
 *         talentScore:
 *           $ref: '#/components/schemas/TalentScore'
 *         jobDescription:
 *           type: string
 *           nullable: true
 *           description: "MongoDB ObjectId referencing the JobDescription"
 *           example: "774g2b3c4d5e6f7a8b9c1e2f"
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
 *       Accepts one or more resume files (PDF, DOCX, or ZIP), extracts their text,
 *       parses structured data using Gemini AI, and saves each as a talent profile.
 *
 *       **Constraints:**
 *       - Accepted formats: `.pdf`, `.docx`, and `.zip` only
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
 *                 description: "PDF, DOCX, or ZIP resume files. Max 20 files."
 *     responses:
 *       200:
 *         description: Resumes parsed and talent profiles saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 saved:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       file:
 *                         type: string
 *                         example: "john_doe_resume.pdf"
 *                       profile:
 *                         $ref: '#/components/schemas/TalentProfile'
 *       400:
 *         description: No files uploaded or unsupported file type.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error during AI parsing or database save.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/talent/generateScore:
 *   post:
 *     tags:
 *       - Talent
 *     summary: Generate a match score for a talent against a job description
 *     description: |
 *       Uses Gemini AI to evaluate how well a talent profile matches a job description.
 *       The score and job description ID are saved to the talent's profile.
 *     operationId: generateScoreForOneTalent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - talentId
 *               - jobDescriptionId
 *             properties:
 *               talentId:
 *                 type: string
 *                 example: "664f1a2b3c4d5e6f7a8b9c0d"
 *               jobDescriptionId:
 *                 type: string
 *                 example: "774g2b3c4d5e6f7a8b9c1e2f"
 *     responses:
 *       200:
 *         description: Score generated and saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatedScore:
 *                   $ref: '#/components/schemas/TalentProfile'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/talent/generateScoreForAll:
 *   post:
 *     tags:
 *       - Talent
 *     summary: Generate match scores for all talents against a job description
 *     description: |
 *       Loops through every talent in the database and scores each one against
 *       the provided job description. Each talent's score and job description ID
 *       are saved to their profile.
 *
 *       **Note:** This may take a while depending on the number of talent profiles.
 *     operationId: generateScoreForAllTalents
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobDescriptionId
 *             properties:
 *               jobDescriptionId:
 *                 type: string
 *                 example: "774g2b3c4d5e6f7a8b9c1e2f"
 *     responses:
 *       200:
 *         description: Scores generated and saved for all talents.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       talentId:
 *                         type: string
 *                         example: "664f1a2b3c4d5e6f7a8b9c0d"
 *                       score:
 *                         $ref: '#/components/schemas/TalentScore'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/talent/getTalentInfo:
 *   get:
 *     tags:
 *       - Talent
 *     summary: Get a single talent profile by ID
 *     operationId: getTalentInfo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - talentId
 *             properties:
 *               talentId:
 *                 type: string
 *                 example: "664f1a2b3c4d5e6f7a8b9c0d"
 *     responses:
 *       200:
 *         description: Talent profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 talentInfos:
 *                   $ref: '#/components/schemas/TalentProfile'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/talent/getTalents:
 *   get:
 *     tags:
 *       - Talent
 *     summary: Get all talent profiles ranked by overall score
 *     description: Returns all talent profiles sorted by `talentScore.overallScore` descending.
 *     operationId: getTalents
 *     responses:
 *       200:
 *         description: Ranked list of talent profiles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 talents:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TalentProfile'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/talent/deleteTalent:
 *   delete:
 *     tags:
 *       - Talent
 *     summary: Delete a single talent profile
 *     operationId: deleteTalent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - talentId
 *             properties:
 *               talentId:
 *                 type: string
 *                 example: "664f1a2b3c4d5e6f7a8b9c0d"
 *     responses:
 *       200:
 *         description: Talent deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedTalent:
 *                   $ref: '#/components/schemas/TalentProfile'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/talent/deleteTalentsByJobDescription:
 *   delete:
 *     tags:
 *       - Talent
 *     summary: Delete all talents linked to a job description
 *     operationId: deleteTalentsByJobDescription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobDescriptionId
 *             properties:
 *               jobDescriptionId:
 *                 type: string
 *                 example: "774g2b3c4d5e6f7a8b9c1e2f"
 *     responses:
 *       200:
 *         description: Talents deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "3 talent(s) deleted successfully"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */