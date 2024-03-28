import Job from "../models/job.model.js";

export async function getAllJobs(){
    try{
        return Job.find();
    } catch(error){
        logger.error(`Error Fetching Jobs`);
        logger.error(`${error.message}`);
        throw new Error(`User creation failed`);    
    }
}