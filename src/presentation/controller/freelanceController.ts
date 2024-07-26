import { NextFunction, Request, Response } from "express";
import { IfreelanceUseCase } from "../../application/interface/IfreelanceUseCase";

export class freelanceController {
  private freelanceService: IfreelanceUseCase;
  constructor(freelanceService: IfreelanceUseCase) {
    this.freelanceService = freelanceService;
  }
  async createJob(req: Request, res: Response) {
    try {
      let image = req.file;
      let rest = req.body;
      const values = { image, ...rest };
      const response = await this.freelanceService.CreateJob(values);
      res.status(200).json({ message: "Job Created Successfully", response });
    } catch (error) {
      console.error("Error occured in creating Job", error);
      res.status(500).json({ message: "Job Creation Failed" });
    }
  }
  async getALlJob(req: Request, res: Response) {
    try {
      const response = await this.freelanceService.getAllJob();
      res.status(200).json({ message: " Got All Jobs Successfully", response });
    } catch (error) {
      console.error("Error occured in getting Job", error);
      res.status(500).json({ message: "Job getting Failed" });
    }
  }
  async getAllAdminJob(req: Request, res: Response) {
    try {
      const response = await this.freelanceService.getAllAdminJob();
      res.status(200).json({ message: " Got All Admin Side Jobs Successfully", response });
    } catch (error) {
      console.error("Error occured in getting  Admin Job", error);
      res.status(500).json({ message: "Job getting Failed" });
    }
  }
  async proposalPost(req: Request, res: Response) {
    try {
      console.log("req.body", req.body);
      console.log("req.file", req.file);
      const cvImage = req.file;
      const values = { cvImage, ...req.body };
      console.log("values.file", values);
      const response = await this.freelanceService.proposalSend(values);
      res
        .status(200)
        .json({ message: "Proposal Send  Successfully", response });
    } catch (error) {
      console.error("Error occured in Send Proposal", error);
      res.status(500).json({ message: "Send Proposal Failed" });
    }
  }
  async getuserALlJob(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const response = await this.freelanceService.getuserAllJobs(userId);
      res.status(200).json({ message: " Got All Jobs Successfully", response });
    } catch (error) {
      console.error("Error occured in getting Job", error);
      res.status(500).json({ message: "Job getting Failed" });
    }
  }
  async getAllProposals(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const response = await this.freelanceService.getAllProposals(userId);
      res
        .status(200)
        .json({ message: " Got All Proposals Successfully", response });
    } catch (error) {
      console.error("Error occured in getting All Proposals", error);
      res.status(500).json({ message: "All Proposals getting Failed" });
    }
  }
  async getJobRequests(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const response = await this.freelanceService.getJobRequests(userId);
      res
        .status(200)
        .json({ message: " Got All Job Request Successfully", response });
    } catch (error) {
      console.error("Error occured in getting Job Request", error);
      res.status(500).json({ message: "Job Request getting Failed" });
    }
  }
  async proposalStatus(req: Request, res: Response){
    try {
      const proposalId = req.params.proposalId
      const {action} = req.body
      console.log("proposalStatus", proposalId, action);
      const response = await this.freelanceService.changeProposalStatus(proposalId,action)
      res.status(200).json({message:"Proposal status updated",response})
    } catch (error) {
      console.error("Error occured in Changing In Proposal Status", error);
      res.status(500).json({ message: "Proposal Status Change getting Failed" });
    }
  }
  async jobDetailsWithId(req: Request,res: Response){
    try {
      const jobId  = req.params.jobId;
      const response = await this.freelanceService.jobDetailsWithId(jobId);
      res.status(200).json({ message:"Job Details with Id Fetched successfully",response});
    } catch (error) {
      console.error("error Occured While processing The Job Details",error);
      res.status(500).json({ message: "error Occured While processing The Job Details"});
    }
  }
  async jobEdit(req: Request,res: Response){
  console.log("req",req.body);
  try {
    const values = req.body;
      const jobId = req.params.jobId;
      const allValues = {jobId,...values};
      const response = await this.freelanceService.UpdateJob(allValues);
      res.status(200).json({message:"Job Updated Successfully",response})
  } catch (error) {
    console.error("error Occured While Update The Job Details",error);
      res.status(500).json({ message: "error Occured While Update The Job Details"});
  }
  }
  async deleteJob(req: Request,res: Response){
  try {
      const jobId = req.params.jobId;
      const response = await this.freelanceService.deleteJob(jobId);
      res.status(200).json({message:"Job Deleted Successfully",response})
  } catch (error) {
    console.error("error Occured While Delete The Job ",error);
      res.status(500).json({ message: "error Occured While Delete The Job "});
  }
  }
}
