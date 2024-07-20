import { CreateJob } from "../../domain/entitites/createJob";
import { IMergedJobProposal } from "../../domain/entitites/OurJobList";
import { returnProposal } from "../../domain/entitites/Proposalreturn";
import { proposalPost } from "../../domain/entitites/sendProposal";
import { IJob } from "../../infrastructure/database/Model/CreateJob";
import { IProposal } from "../../infrastructure/database/Model/ProposalDb";

export interface IfreelanceUseCase {
  CreateJob(values: CreateJob): Promise<IJob | null>;
  getAllJob(): Promise<IJob[] | null>;
  proposalSend(values: proposalPost): Promise<returnProposal | null>;
  getuserAllJobs(userId: string): Promise<IJob[] | null>;
  getAllProposals(userId: string): Promise<IMergedJobProposal[] | null>;
  getJobRequests(userId: string): Promise<IMergedJobProposal[] | null>;
  changeProposalStatus(proposalId: string,action: string): Promise<IProposal | null>;
}
