import { CreateJob } from "../../domain/entitites/createJob";
import { IMergedJobProposal } from "../../domain/entitites/OurJobList";
import { returnProposal } from "../../domain/entitites/Proposalreturn";
import { proposalPost } from "../../domain/entitites/sendProposal";
import { IJob } from "../database/Model/CreateJob";

export interface IfreelanceRepository {
  createJob(values: CreateJob): Promise<IJob | null>;
  GetJob(): Promise<IJob[] | null>;
  sendProposalDb(values: proposalPost): Promise<returnProposal | null>;
  getUserJobsDb(userId: string): Promise<IJob[] | null>;
  getAllProposals(userId: string): Promise<any[] | null>;
  getJobRequests(userId: string): Promise<any[] | null>;
}
