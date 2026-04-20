import { getTalentInfos } from "../services/talentProfile.service"

const generateScore=async(talentId:string,jobDescriptionId:string)=>{
    const talentInfo=getTalentInfos(talentId)
}