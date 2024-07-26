import { CreateJob } from "../../domain/entitites/createJob";
import { CombinedValues } from "../../domain/entitites/OurJobList";
import { returnProposal } from "../../domain/entitites/Proposalreturn";
import { proposalPost } from "../../domain/entitites/sendProposal";
import { updateJobPost } from "../../domain/entitites/updateJob";
import { IJob } from "../database/Model/CreateJob";
import { IProposal } from "../database/Model/ProposalDb";

export interface IfreelanceRepository {
  createJob(values: CreateJob): Promise<IJob | null>;
  GetJob(): Promise<IJob[] | null>;
  getAllAdminJob(): Promise<IJob[] | null>;
  sendProposalDb(values: proposalPost): Promise<returnProposal | null>;
  getUserJobsDb(userId: string): Promise<IJob[] | null>;
  getAllProposals(userId: string): Promise<CombinedValues | null>;
  getJobRequests(userId: string): Promise<CombinedValues | null>;
  proposalStatusDb(proposalId: string,action: string): Promise<IProposal | null>;
  jobdetailsDb(jobId: string): Promise<IJob | null>;
  UpdateJobDb(values: updateJobPost): Promise<IJob | null>;
  deleteJobDb(jobId: string): Promise<IJob | null>;
  adminJobBlock(jobId: string,isBlock:boolean): Promise<IJob | null>;
}
