import { CreateJob } from "../../domain/entitites/createJob";
import { CreateSkillALL } from "../../domain/entitites/createSkill";
import {
  CombinedValues,
  IDbValues,
  IJobDocuments,
} from "../../domain/entitites/OurJobList";
import { ISkill, IskillProposal } from "../../domain/entitites/OurSkillList";
import { proposalPost } from "../../domain/entitites/sendProposal";
import { SkillProposal } from "../../domain/entitites/skillProposal";
import { updateJobPost } from "../../domain/entitites/updateJob";
import { UpdateSkill } from "../../domain/entitites/updateSkill";
import { kafkaConsumer } from "../broker/kafkaBroker/kafkaConsumer";
import { kafkaProducer } from "../broker/kafkaBroker/kafkaProducer";
import Job from "../database/Model/CreateJob";
import Skill from "../database/Model/CreateSkill";
import ProposalDb from "../database/Model/ProposalDb";
import skillProposalDb from "../database/Model/skillProposal";
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
      const dbValues = await Job.find({ isBlock: false });
      if (dbValues) {
        const currentTime = new Date();
        const updatePromises = dbValues.map(async (job) => {
          if (new Date(job.deadline) < currentTime && job.status !== "Closed") {
            job.status = "Closed";
          } else if (job.status !== "Open") {
            job.status = "Open";
          }
          await job.save();
          return job;
        });
        const updatedJobs = await Promise.all(updatePromises);
        console.log("updatedJobs", updatedJobs);
        return updatedJobs;
      }
      return null;
    } catch (error) {
      console.log("Error occurred while getting jobs from the database", error);
      return null;
    }
  }
  async getAllAdminJob() {
    try {
      const dbValues = await Job.find();
      if (dbValues) {
        const currentTime = new Date();
        const updatePromises = dbValues.map(async (job) => {
          if (new Date(job.deadline) < currentTime && job.status !== "Closed") {
            job.status = "Closed";
          } else if (job.status !== "Open") {
            job.status = "Open";
          }
          await job.save();
          return job;
        });
        const updatedJobs = await Promise.all(updatePromises);
        console.log("updatedJobs", updatedJobs);
        return updatedJobs;
      }
      return null;
    } catch (error) {
      console.log(
        "Error occurred while getting jobs admin from the database",
        error
      );
      return null;
    }
  }

  async sendProposalDb(values: proposalPost) {
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
  async skillProposal(values: SkillProposal) {
    try {
      console.log("values Created  successfully:", values);

      const s3Response: any = await uploadS3Image(values.Image);
      if (s3Response.error) {
        console.error("Error uploading image to S3:", s3Response.error);
        throw new Error("Failed to upload image to S3");
      }

      console.log("URL of the image from the S3 bucket:", s3Response.Location);

      const proposalValues = {
        OwnerEmail: values.email,
        skillId: values.skillId,
        userId: values.userId,
        description: values.description,
        image: s3Response.Location,
      };
      const newProposal = new skillProposalDb(proposalValues);
      const proposalSaved = await newProposal.save();

      console.log(" Skill Proposal created successfully:", proposalSaved);
      return proposalSaved ? proposalSaved : null;
    } catch (error) {
      console.error("Error in Skill ProposalDb:", error);
      return null;
    }
  }
  async getUserSkillsDb(userId: string) {
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

      const dbValues = await Skill.find({ email: userDetails.email });
      console.log("Skill found in database", dbValues);
      return dbValues ? dbValues : null;
    } catch (error) {
      console.log(
        "Error occurred while getting Skill from the database",
        error
      );
      return null;
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
          } else {
            job.status = "Open";
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
  async getJobRequests(userId: string) {
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

      const dbValues = (await ProposalDb.find({
        jobOwnerEmail: userDetails.email,
      })) as IDbValues[];
      if (!dbValues || dbValues.length === 0) {
        return null;
      }

      const jobIds = dbValues.map((value) => value.jobId);
      const jobDocuments = (await Job.find({
        _id: { $in: jobIds },
      })) as IJobDocuments[];

      return { dbValues, jobDocuments };
    } catch (error) {
      console.log(
        "Error occurred while getting job requests from the database",
        error
      );
      return null;
    }
  }
  async getSkillRequests(userId: string) {
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

      const dbValues = (await skillProposalDb.find({
        OwnerEmail: userDetails.email,
      })) as IskillProposal[];
      if (!dbValues || dbValues.length === 0) {
        return null;
      }

      const skillIds = dbValues.map((value) => value.skillId);
      const skillDocuments = (await Skill.find({
        _id: { $in: skillIds },
      })) as ISkill[];

      return { dbValues, skillDocuments };
    } catch (error) {
      console.log(
        "Error occurred while getting skill requests from the database",
        error
      );
      return null;
    }
  }

  async getAllProposals(userId: string) {
    try {
      const dbValues = (await ProposalDb.find({
        userId: userId,
      })) as IDbValues[];
      if (!dbValues || dbValues.length === 0) {
        return null;
      }

      const jobIds = dbValues.map((value) => value.jobId);
      const jobDocuments = (await Job.find({
        _id: { $in: jobIds },
      })) as IJobDocuments[];

      const currentTime = new Date();
      const updatePromises = jobDocuments.map(async (job) => {
        if (new Date(job.deadline) < currentTime && job.status !== "Closed") {
          job.status = "Closed";
        } else if (job.status !== "Closed") {
          job.status = "Open";
        }
        return job.save();
      });

      const updatedJobDocuments = await Promise.all(updatePromises);

      return { dbValues, jobDocuments: updatedJobDocuments };
    } catch (error) {
      console.log(
        "Error occurred while getting proposals from the database",
        error
      );
      return null;
    }
  }
  async getAllSkillProposals(userId: string) {
    try {
      const dbValues = (await skillProposalDb.find({
        userId: userId,
      })) as IskillProposal[];
      if (!dbValues || dbValues.length === 0) {
        return null;
      }

      const skillIds = dbValues.map((value) => value.skillId);
      const skillDocuments = (await Skill.find({
        _id: { $in: skillIds },
      })) as ISkill[];
      return { dbValues, skillDocuments };
    } catch (error) {
      console.log(
        "Error occurred while getting proposals from the database",
        error
      );
      return null;
    }
  }
  async proposalStatusDb(proposalId: string, action: string) {
    try {
      console.log("proposalId", proposalId, action);

      const proposal = await ProposalDb.findByIdAndUpdate(
        proposalId,
        { status: action },
        { new: true }
      ).exec();
      return proposal ? proposal : null;
    } catch (error) {
      console.log("Error updating proposal Status", error);
      return null;
    }
  }
  async skillProposalStatusDb(proposalId: string, action: string) {
    try {
      console.log("proposalId", proposalId, action);

      const proposal = await skillProposalDb
        .findByIdAndUpdate(proposalId, { status: action }, { new: true })
        .exec();
      return proposal ? proposal : null;
    } catch (error) {
      console.log("Error updating proposal Skill Status", error);
      return null;
    }
  }
  async jobdetailsDb(jobId: string) {
    try {
      const jobDetails = await Job.findById(jobId);
      return jobDetails ? jobDetails : null;
    } catch (error) {
      console.log("Error Getting Job details", error);
      return null;
    }
  }
  async skilldetailsDb(skillId: string) {
    try {
      const skillDetails = await Skill.findById(skillId);
      return skillDetails ? skillDetails : null;
    } catch (error) {
      console.log("Error Getting Job details", error);
      return null;
    }
  }
  async UpdateJobDb(values: updateJobPost) {
    try {
      const { jobId, ...updateData } = values;

      const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedJob) {
        throw new Error("Job not found");
      }

      return updatedJob;
    } catch (error) {
      console.error("Error updating job:", error);
      return null;
    }
  }
  async UpdateSkillDb(values: UpdateSkill) {
    try {
      const { skillId, ...updateData } = values;

      const updatedSkill = await Skill.findByIdAndUpdate(
        skillId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedSkill) {
        throw new Error("Skill not found");
      }

      return updatedSkill;
    } catch (error) {
      console.error("Error updating skill:", error);
      return null;
    }
  }
  async deleteJobDb(jobId: string) {
    try {
      const jobDetails = await Job.findByIdAndDelete(jobId);
      return jobDetails ? jobDetails : null;
    } catch (error) {
      console.log("Error Deleting Job ", error);
      return null;
    }
  }
  async deleteSkillDb(skillId: string) {
    try {
      const skillDetails = await Skill.findByIdAndDelete(skillId);
      return skillDetails ? skillDetails : null;
    } catch (error) {
      console.log("Error Deleting Skill", error);
      return null;
    }
  }
  async adminJobBlock(jobId: string, isBlock: boolean) {
    try {
      const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        { isBlock: isBlock },
        { new: true }
      );

      return updatedJob ? updatedJob : null;
    } catch (error) {
      console.error("Error updating job Block", error);
      return null;
    }
  }

  async createSkill(allValues: CreateSkillALL) {
    try {
      const s3Response: any = await uploadS3Image(allValues.image);
      if (s3Response.error) {
        console.error("Error uploading image to S3:", s3Response.error);

        throw new Error("Failed to upload image to S3");
      }

      console.log("URL of the image from the S3 bucket:", s3Response.Location);
      const dbValues = {
        title: allValues.title,
        description: allValues.description,
        category: allValues.category,
        proficiency: allValues.proficiency,
        yearsOfExperience: allValues.yearsOfExperience,
        availability: allValues.availability,
        username: allValues.username,
        email: allValues.email,
        image: s3Response.Location,
      };

      const newSkill = new Skill(dbValues);
      const SkillDbResponse = await newSkill.save();
      console.log("Skill Created  successfully:", SkillDbResponse);

      return SkillDbResponse ? SkillDbResponse : null;
    } catch (error) {
      console.error("Error Creating Skill", error);
      return null;
    }
  }
  async getAdminSkillDb() {
    try {
      const skillDb = await Skill.find();
      return skillDb ? skillDb : null;
    } catch (error) {
      console.error("Error Getting Admin Skill", error);
      return null;
    }
  }
  async getSkill() {
    try {
      const skillDb = await Skill.find({ isBlock: false });
      return skillDb ? skillDb : null;
    } catch (error) {
      console.error("Error Getting  Skill", error);
      return null;
    }
  }
  async skillBlockDb(skillId: string, isBlock: boolean) {
    try {
      const skillDb = await Skill.findByIdAndUpdate(
        skillId,
        { isBlock: isBlock },
        { new: true }
      );
      return skillDb ? skillDb : null;
    } catch (error) {
      console.error("Error Getting Admin Skill", error);
      return null;
    }
  }
  async userProposalMessageDb(email: string) {
    try {
      const proposalResponses = await skillProposalDb.find({
        OwnerEmail: email,
        status: "accept",
      });
  
      if (proposalResponses.length === 0) {
        console.log("No matching proposals found");
        return null;
      }
  
      const receiverDetails: Array<{ _id: string; username: string; email: string }> = [];
  
      for (const proposal of proposalResponses) {
        await kafkaProducer.sendUserDetailsRequest(proposal.userId.toString());
  
        const userDetails = await kafkaConsumer.waitForUserDetailsResponse(
          proposal.userId.toString()
        );
        console.log("userDetails from kafka consumer", userDetails);
  
        if (userDetails && userDetails._id && userDetails.username && userDetails.email) {
          receiverDetails.push({
            _id: userDetails._id,
            username: userDetails.username,
            email: userDetails.email,
          });
        } else {
          console.log(
            `User details are incomplete or undefined for userId: ${proposal.userId}`
          );
        }
      }
  
      if (receiverDetails.length === 0) {
        console.log("No valid receiver details found");
        return null;
      }
  
      return {
        senderEmail: email,
        receiverDetails: receiverDetails,
      };
    } catch (error) {
      console.error("Error getting skillProposalDb Message", error);
      return null;
    }
  }
  
}
