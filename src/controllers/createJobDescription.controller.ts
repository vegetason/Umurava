import { Request, Response } from "express";
import { createJobDescription } from "../services/jobDescription.service";
import { JobDescriptionInfoType } from "../types/jobDescriptionInfo.type";

export const  createJobDescriptionInfo=async (req:Request,res:Response)=>{
    try{
        const jobDescription=req.body as JobDescriptionInfoType
        const jobInfo=await createJobDescription(jobDescription)
        return res.json({jobInfo})
    }
    catch(err){
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
}