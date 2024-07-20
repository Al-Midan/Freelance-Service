import { CreateJob } from "../../domain/entitites/createJob";
import { returnProposal } from "../../domain/entitites/Proposalreturn";
import { proposalPost } from "../../domain/entitites/sendProposal";
import { IJob } from "../../infrastructure/database/Model/CreateJob";
import { IProposal } from "../../infrastructure/database/Model/ProposalDb";

export interface IfreelanceUseCase {
  CreateJob(values: CreateJob): Promise<IJob | null>;
  getAllJob(): Promise<IJob[] | null>;
  proposalSend(values:proposalPost):Promise<returnProposal | null>;
  getuserAllJobs(userId:string): Promise<IJob[] | null>;
  getAllProposals(): Promise<IProposal[] | null>;
}
