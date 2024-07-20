import { CreateJob } from "../../domain/entitites/createJob";
import { proposalPost } from "../../domain/entitites/sendProposal";
import { kafkaConsumer } from "../broker/kafkaBroker/kafkaConsumer";
import { kafkaProducer } from "../broker/kafkaBroker/kafkaProducer";
import Job from "../database/Model/CreateJob";
import ProposalDb from "../database/Model/ProposalDb";
import { IfreelanceRepository } from "../interface/IfreelanceRepository";
import { uploadS3Image } from "../s3/s3Uploader";

export class freelanceRepository implements IfreelanceRepository {
  async createJob(allValues: CreateJob) {
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
  async GetJob() {
    try {
      const dbValues = await Job.find();
      if (dbValues) {
        const currentTime = new Date();
        const updatePromises = dbValues.map(async (job) => {
          if (new Date(job.deadline) < currentTime && job.status !== "Closed") {
            job.status = "Closed";
            await job.save();
          }
          return job;
        });

        const updatedJobs = await Promise.all(updatePromises);
        return updatedJobs;
      }
      return null;
    } catch (error) {
      console.log("Error occurred while getting jobs from the database", error);
      return null;
    }
  }

  async sendProposalDb(values: proposalPost): Promise<any> {
    try {
      console.log("values Created  successfully:", values);

      const s3Response: any = await uploadS3Image(values.cvImage);
      if (s3Response.error) {
        console.error("Error uploading image to S3:", s3Response.error);
        throw new Error("Failed to upload image to S3");
      }

      console.log("URL of the image from the S3 bucket:", s3Response.Location);

      const proposalValues = {
        userId: values.userId,
        jobId: values.jobId,
        jobOwner: values.jobOwner,
        jobOwnerEmail: values.jobOwnerEmail,
        description: values.description,
        image: s3Response.Location,
      };
      const newProposal = new ProposalDb(proposalValues);
      const proposalSaved = await newProposal.save();

      console.log("Proposal created successfully:", proposalSaved);
      return proposalSaved ? proposalSaved : null;
    } catch (error) {
      console.error("Error in sendProposalDb:", error);
      throw error;
    }
  }
  async getUserJobsDb(userId: string) {
    try {
      await kafkaProducer.sendUserDetailsRequest(userId);
      const userDetails = await kafkaConsumer.waitForUserDetailsResponse(
        userId
      );
      console.log("userDetails from kafka consumer", userDetails);

      if (!userDetails || !userDetails.email) {
        console.log("User details or email is undefined");
        return null;
      }

      const dbValues = await Job.find({ email: userDetails.email });
      console.log("Jobs found in database", dbValues);

      if (dbValues && dbValues.length > 0) {
        const currentTime = new Date();
        const updatePromises = dbValues.map(async (job) => {
          if (new Date(job.deadline) < currentTime && job.status !== "Closed") {
            job.status = "Closed";
            await job.save();
          }
          return job;
        });

        const updatedJobs = await Promise.all(updatePromises);
        return updatedJobs;
      } else {
        console.log("No jobs found for the user");
        return null;
      }
    } catch (error) {
      console.log("Error occurred while getting jobs from the database", error);
      return null;
    }
  }
  async getAllProposals() {
    try {
      const dbValues = await ProposalDb.find();
     
        
     return dbValues ? dbValues : null;
    } catch (error) {
      console.log("Error occurred while getting jobs from the database", error);
      return null;
    }
  }

}
