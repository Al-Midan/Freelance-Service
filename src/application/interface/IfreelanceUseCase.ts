import { CreateJob } from "../../domain/entitites/createJob";
import { CreateSkillALL } from "../../domain/entitites/createSkill";
import { CombinedValues } from "../../domain/entitites/OurJobList";
import { CombinedSkillValues } from "../../domain/entitites/OurSkillList";
import { proposalPost } from "../../domain/entitites/sendProposal";
import { SkillProposal } from "../../domain/entitites/skillProposal";
import { updateJobPost } from "../../domain/entitites/updateJob";
import { IJob } from "../../infrastructure/database/Model/CreateJob";
import { ISkill } from "../../infrastructure/database/Model/CreateSkill";
import { IProposal } from "../../infrastructure/database/Model/ProposalDb";
import { IskillProposal } from "../../infrastructure/database/Model/skillProposal";

export interface IfreelanceUseCase {
  CreateJob(values: CreateJob): Promise<IJob | null>;
  getAllJob(): Promise<IJob[] | null>;
  getAllAdminJob(): Promise<IJob[] | null>;
  proposalSend(values: proposalPost): Promise<IProposal | null>;
  skillProposal(values: SkillProposal): Promise<IskillProposal | null>;
  getuserAllJobs(userId: string): Promise<IJob[] | null>;
  getuserAllSkills(userId: string): Promise<ISkill[] | null>;
  getAllProposals(userId: string): Promise<CombinedValues | null>;
  getAllSkillProposals(userId: string): Promise<CombinedSkillValues | null>;
  getJobRequests(userId: string): Promise<CombinedValues | null>;
  getSkillRequests(userId: string): Promise<CombinedSkillValues | null>;
  changeProposalStatus(proposalId: string,action: string): Promise<IProposal | null>;
  changeSkillProposalStatus(proposalId: string,action: string): Promise<IskillProposal | null>;
  jobDetailsWithId(jobId: string): Promise<IJob | null>;
  UpdateJob(values: updateJobPost): Promise<IJob | null>;
  deleteJob(jobId: string): Promise<IJob | null>;
  deleteSkill(skillId: string): Promise<ISkill | null>;
  adminJobBlock(jobId: string,isBlock:boolean): Promise<IJob | null>;
  createSkill(allValues: CreateSkillALL): Promise<ISkill | null>;
  getAdminSkill(): Promise<ISkill[] | null>;
  skillBlock(skillId:string,isBlock:boolean): Promise<ISkill | null>;
  getSkill(): Promise<ISkill[] | null>;
}
