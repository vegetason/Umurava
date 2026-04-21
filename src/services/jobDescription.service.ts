import JobDescription from "../database/models/jobDescription.model"
import { JobDescriptionInfoType } from "../types/jobDescriptionInfo.type"

export const getJobDescriptionInfos=async (id:string)=>{
    const jobDescriptionInfo= await JobDescription.findById(id)
    return jobDescriptionInfo
}

export const createJobDescription = async (jobDescription: JobDescriptionInfoType) => {
    const newJobDescription = new JobDescription(jobDescription);
    return await newJobDescription.save();
};

export const getJobDescriptions = async () => {
    return await JobDescription.find();
};


export const updateJobDescription = async (id: string, jobDescription: Partial<JobDescriptionInfoType>) => {
    return await JobDescription.findByIdAndUpdate(id, jobDescription, { new: true });
};

export const deleteJobDescription = async (id: string) => {
    return await JobDescription.findByIdAndDelete(id);
};