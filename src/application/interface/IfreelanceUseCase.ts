import { CreateJob } from "../../domain/entitites/createJob";
import { CreateSkillALL } from "../../domain/entitites/createSkill";
import { CombinedValues } from "../../domain/entitites/OurJobList";
import { returnProposal } from "../../domain/entitites/Proposalreturn";
import { proposalPost } from "../../domain/entitites/sendProposal";
import { updateJobPost } from "../../domain/entitites/updateJob";
import { IJob } from "../../infrastructure/database/Model/CreateJob";
import { ISkill } from "../../infrastructure/database/Model/CreateSkill";
import { IProposal } from "../../infrastructure/database/Model/ProposalDb";

export interface IfreelanceUseCase {
  CreateJob(values: CreateJob): Promise<IJob | null>;
  getAllJob(): Promise<IJob[] | null>;
  getAllAdminJob(): Promise<IJob[] | null>;
  proposalSend(values: proposalPost): Promise<returnProposal | null>;
  getuserAllJobs(userId: string): Promise<IJob[] | null>;
  getAllProposals(userId: string): Promise<CombinedValues | null>;
  getJobRequests(userId: string): Promise<CombinedValues | null>;
  changeProposalStatus(proposalId: string,action: string): Promise<IProposal | null>;
  jobDetailsWithId(jobId: string): Promise<IJob | null>;
  UpdateJob(values: updateJobPost): Promise<IJob | null>;
  deleteJob(jobId: string): Promise<IJob | null>;
  adminJobBlock(jobId: string,isBlock:boolean): Promise<IJob | null>;
  createSkill(allValues: CreateSkillALL): Promise<ISkill | null>;
  getAdminSkill(): Promise<ISkill[] | null>;
  skillBlock(skillId:string,isBlock:boolean): Promise<ISkill | null>;
  getSkill(): Promise<ISkill[] | null>;
}
