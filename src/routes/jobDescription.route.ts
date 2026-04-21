import express from "express";
import { createJobDescriptionInfo } from "../controllers/createJobDescription.controller";
import {
    deleteJobDescriptionController,
    getJobDescriptionController,
    getJobDescriptionsController,
    updateJobDescriptionController
} from "../controllers/jobDescription.controller";

let JobDescriptionRouter = express.Router();

JobDescriptionRouter.post("/createJobDescription", createJobDescriptionInfo);
JobDescriptionRouter.get("/", getJobDescriptionsController);
JobDescriptionRouter.get("/getOne", getJobDescriptionController);
JobDescriptionRouter.put("/update", updateJobDescriptionController);
JobDescriptionRouter.delete("/delete", deleteJobDescriptionController);

export default JobDescriptionRouter;

/**
 * @openapi
 * components:
 *   schemas:
 *     JobDescription:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "774g2b3c4d5e6f7a8b9c1e2f"
 *         jobTitle:
 *           type: string
 *           example: "Backend Developer"
 *         department:
 *           type: string
 *           example: "Engineering"
 *         description:
 *           type: string
 *           example: "We are looking for an experienced backend developer..."
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * /api/jobDescription/createJobDescription:
 *   post:
 *     tags:
 *       - Job Description
 *     summary: Create a new job description
 *     operationId: createJobDescription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobTitle
 *               - department
 *               - description
 *             properties:
 *               jobTitle:
 *                 type: string
 *                 example: "Backend Developer"
 *               department:
 *                 type: string
 *                 example: "Engineering"
 *               description:
 *                 type: string
 *                 example: "We are looking for an experienced backend developer..."
 *     responses:
 *       200:
 *         description: Job description created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobInfo:
 *                   $ref: '#/components/schemas/JobDescription'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/jobDescription/:
 *   get:
 *     tags:
 *       - Job Description
 *     summary: Get all job descriptions
 *     operationId: getJobDescriptions
 *     responses:
 *       200:
 *         description: List of all job descriptions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobDescriptions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/JobDescription'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/jobDescription/getOne:
 *   get:
 *     tags:
 *       - Job Description
 *     summary: Get a single job description by ID
 *     operationId: getJobDescription
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
 *         description: Job description retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobDescription:
 *                   $ref: '#/components/schemas/JobDescription'
 *       404:
 *         description: Job description not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/jobDescription/update:
 *   put:
 *     tags:
 *       - Job Description
 *     summary: Update a job description
 *     operationId: updateJobDescription
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
 *               jobTitle:
 *                 type: string
 *                 example: "Senior Backend Developer"
 *               department:
 *                 type: string
 *                 example: "Engineering"
 *               description:
 *                 type: string
 *                 example: "Updated job description text..."
 *     responses:
 *       200:
 *         description: Job description updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updated:
 *                   $ref: '#/components/schemas/JobDescription'
 *       404:
 *         description: Job description not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/jobDescription/delete:
 *   delete:
 *     tags:
 *       - Job Description
 *     summary: Delete a job description and all linked talents
 *     description: Deletes the job description and cascades to delete all talent profiles linked to it.
 *     operationId: deleteJobDescription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: "774g2b3c4d5e6f7a8b9c1e2f"
 *     responses:
 *       200:
 *         description: Job description and linked talents deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Job description and linked talents deleted successfully"
 *       404:
 *         description: Job description not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */