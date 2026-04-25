import { Request, Response } from "express"
import { deleteTalent, deleteTalentsByJobDescription, getRankedTalents, getTalentInfos, getTalentsByStatus, updateTalentStatus } from "../services/talentProfile.service"

export const getTalentInfo=async(req:Request,res:Response)=>{
    try{
        const talentId=req.body.talentId as string
        const talentInfos=await getTalentInfos(talentId)

        return res.json({talentInfos})
    }
    catch (err){
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
}

export const getTalents = async (req: Request, res: Response) => {
    try {
        const talents = await getRankedTalents();
        return res.json({ talents });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
};

export const deleteTheTalent=async (req:Request,res:Response)=>{
    try{
        const talentId=req.body.talentId as string
        const deletedTalent=await deleteTalent(talentId)
        return res.json({deletedTalent})
    }
    catch(err){
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
}

export const deleteTalentsByJobDescriptionController = async (req: Request, res: Response) => {
    try {
        const result = await deleteTalentsByJobDescription(req.body.jobDescriptionId);
        return res.json({ message: `${result.deletedCount} talent(s) deleted successfully` });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
};

export const getTalentsByStatusController = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const talents = await getTalentsByStatus(
      status as "Pending" | "Screened" | "Shortlisted" | "Emailed" | "Rejected"
    );

    return res.json({ talents });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

export const updateTalentStatusController = async (req: Request, res: Response) => {
  try {
    const { talentId, status } = req.body;

    if (!status || !talentId) {
      return res.status(400).json({ message: "talentId and status are required" });
    }

    const updatedTalent = await updateTalentStatus(
      talentId,
      status as "Pending" | "Screened" | "Shortlisted" | "Emailed" | "Rejected"
    );

    if (!updatedTalent) {
      return res.status(404).json({ message: "Talent not found" });
    }

    return res.json({ talent: updatedTalent });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err });
  }
};