import { CreateJob } from "../../domain/entitites/createJob";
import Job from "../database/Model/CreateJob";
import { IfreelanceRepository } from "../interface/IfreelanceRepository";
import { uploadS3Image } from "../s3/s3Uploader";

export class freelanceRepository implements IfreelanceRepository {
  async createJob(allValues: CreateJob) {
    console.log("allvalues", allValues);

    const s3Response: any = await uploadS3Image(allValues.image);
    if (s3Response.error) {
      console.error("Error uploading image to S3:", s3Response.error);

      throw new Error("Failed to upload image to S3");
    }

    console.log("URL of the image from the S3 bucket:", s3Response.Location);
    const newJob = {
      title: allValues.title,
      description: allValues.description,
      category: allValues.category,
      skillsRequired: allValues.skillsRequired,
      budget: allValues.budget,
      paymentType: allValues.paymentType,
      duration: allValues.duration,
      username: allValues.username,
      email: allValues.email,
      experienceLevel: allValues.experienceLevel,
      postedDate: allValues.postedDate,
      deadline: allValues.deadline,
      status: allValues.status,
      image: s3Response.Location,
    };

    const newJobDb = new Job(newJob);
    const savedComplaint = await newJobDb.save();
    console.log("Job Created  successfully:", savedComplaint);

    return savedComplaint ? savedComplaint : null;
  }
  async  GetJob() {
    try {
      const dbValues = await Job.find();
      if (dbValues) {
        const currentTime = new Date();
        dbValues.forEach(job => {
          if (new Date(job.deadline) < currentTime) {
            job.status = 'Closed';
          }
        });
        return dbValues;
      }
      return null;
    } catch (error) {
      console.log("Error occurred while getting jobs from the database", error);
      return null;
    }
  }
  
}
