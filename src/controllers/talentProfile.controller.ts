import { Request, Response } from "express"
import { deleteTalent, deleteTalentsByJobDescription, getRankedTalents, getTalentInfos } from "../services/talentProfile.service"

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

