import { Request, Response } from "express"
import { getJobDescriptionInfos } from "../services/jobDescription.service"
import { getRankedTalents, getTalentInfos, saveScoreForTalent } from "../services/talentProfile.service"
import { generateScoreWithGemini } from "../services/gemni.service"
import { TalentProfileType, TalentScore } from "../types/talent.types"
import { JobDescriptionInfoType } from "../types/jobDescriptionInfo.type"

export const generateScoreForOneTalent=async(req:Request,res:Response)=>{
    try{
        const talentInfo=await getTalentInfos(req.body.talentId) as TalentProfileType
        const jobDescriptionInfo=await getJobDescriptionInfos(req.body.jobDescriptionId) as JobDescriptionInfoType
        const score=await generateScoreWithGemini(talentInfo,jobDescriptionInfo) as TalentScore
        const updatedScore= await saveScoreForTalent(req.body.talentId,score,req.body.jobDescriptionId)

        return res.json({updatedScore})
    }
    catch(err){
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
}

export const generateScoreForAllTalents = async (req: Request, res: Response) => {
    try {
        const jobDescriptionInfo = await getJobDescriptionInfos(req.body.jobDescriptionId) as JobDescriptionInfoType;
        const talents = await getRankedTalents();

        const results = await Promise.all(
            talents.map(async (talent) => {
                const score = await generateScoreWithGemini(talent as TalentProfileType, jobDescriptionInfo) as TalentScore;
                const updated = await saveScoreForTalent(talent._id.toString(), score,req.body.jobDescriptionId);
                return { talentId: talent._id, score };
            })
        );

        return res.json({ results });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
};