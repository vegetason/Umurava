import TalentProfile from "../database/models/talentProfile.model";

export const saveTalentProfile = async (data: any) => {
    const profile = new TalentProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,

        headline: data.headline,
        bio: data.bio,
        location: data.location,

        skills: data.skills,
        experience: data.experience,
        education: data.education,
        projects: data.projects,

        availability: data.availability,
        socialLinks: data.socialLinks
    });

    return await profile.save();
};

export const getTalentInfos=async (id:string)=>{
    const talentInfo= await TalentProfile.findById(id)
    return talentInfo
}