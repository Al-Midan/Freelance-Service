import { CreateJob } from "../../domain/entitites/createJob";
import { returnProposal } from "../../domain/entitites/Proposalreturn";
import { proposalPost } from "../../domain/entitites/sendProposal";
import { IJob } from "../database/Model/CreateJob";
import { IProposal } from "../database/Model/ProposalDb";

export interface IfreelanceRepository {
  createJob(values: CreateJob): Promise<IJob | null>;
  GetJob(): Promise<IJob[] | null>;
  sendProposalDb(values:proposalPost):Promise<returnProposal | null>;
  getUserJobsDb(userId:string): Promise<IJob[] | null>;
  getAllProposals(): Promise<IProposal[] | null>;
}
