import { Request,Response } from "express";
import { createJobDescription, deleteJobDescription, getJobDescriptionInfos, getJobDescriptions, updateJobDescription } from "../services/jobDescription.service";
import { JobDescriptionInfoType } from "../types/jobDescriptionInfo.type";
import { deleteTalentsByJobDescription } from "../services/talentProfile.service";

export const createJobDescriptionController = async (req: Request, res: Response) => {
    try {
        const created = await createJobDescription(req.body as JobDescriptionInfoType);
        return res.status(201).json({ created });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
};

export const getJobDescriptionsController = async (req: Request, res: Response) => {
    try {
        const jobDescriptions = await getJobDescriptions();
        return res.json({ jobDescriptions });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
};

export const getJobDescriptionController = async (req: Request, res: Response) => {
    try {
        const jobDescription = await getJobDescriptionInfos(req.body.jobDescriptionId);
        if (!jobDescription) return res.status(404).json({ message: "Job description not found" });
        return res.json({ jobDescription });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
};

export const updateJobDescriptionController = async (req: Request, res: Response) => {
    try {
        const updated = await updateJobDescription(req.body.jobDescriptionId, req.body as Partial<JobDescriptionInfoType>);
        if (!updated) return res.status(404).json({ message: "Job description not found" });
        return res.json({ updated });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
};

export const deleteJobDescriptionController = async (req: Request, res: Response) => {
    try {
        const deleted = await deleteJobDescription(req.body.id);
        if (!deleted) return res.status(404).json({ message: "Job description not found" });

        await deleteTalentsByJobDescription(req.body.id);

        return res.json({ message: "Job description and linked talents deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
};