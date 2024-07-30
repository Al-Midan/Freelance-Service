import { CreateJob } from "../../domain/entitites/createJob";
import { CreateSkillALL } from "../../domain/entitites/createSkill";
import { ProposalMessageResult } from "../../domain/entitites/MessageUsers";
import { FrontMessageValues } from "../../domain/entitites/MessageValues ";
import { CombinedValues } from "../../domain/entitites/OurJobList";
import { CombinedSkillValues } from "../../domain/entitites/OurSkillList";
import { proposalPost } from "../../domain/entitites/sendProposal";
import { SkillProposal } from "../../domain/entitites/skillProposal";
import { updateJobPost } from "../../domain/entitites/updateJob";
import { UpdateSkill } from "../../domain/entitites/updateSkill";
import { IJob } from "../database/Model/CreateJob";
import { ISkill } from "../database/Model/CreateSkill";
import { IMessage } from "../database/Model/Message";
import { IProposal } from "../database/Model/ProposalDb";
import { IskillProposal } from "../database/Model/skillProposal";

export interface IfreelanceRepository {
  createJob(values: CreateJob): Promise<IJob | null>;
  GetJob(): Promise<IJob[] | null>;
  getAllAdminJob(): Promise<IJob[] | null>;
  sendProposalDb(values: proposalPost): Promise<IProposal | null>;
  skillProposal(values: SkillProposal): Promise<IskillProposal | null>;
  getUserJobsDb(userId: string): Promise<IJob[] | null>;
  getUserSkillsDb(userId: string): Promise<ISkill[] | null>;
  getAllProposals(userId: string): Promise<CombinedValues | null>;
  getAllSkillProposals(userId: string): Promise<CombinedSkillValues | null>;
  getJobRequests(userId: string): Promise<CombinedValues | null>;
  getSkillRequests(userId: string): Promise<CombinedSkillValues | null>;
  proposalStatusDb(
    proposalId: string,
    action: string
  ): Promise<IProposal | null>;
  skillProposalStatusDb(
    proposalId: string,
    action: string
  ): Promise<IskillProposal | null>;
  jobdetailsDb(jobId: string): Promise<IJob | null>;
  skilldetailsDb(skillId: string): Promise<ISkill | null>;
  UpdateJobDb(values: updateJobPost): Promise<IJob | null>;
  UpdateSkillDb(values: UpdateSkill): Promise<ISkill | null>;
  deleteJobDb(jobId: string): Promise<IJob | null>;
  deleteSkillDb(skillId: string): Promise<ISkill | null>;
  adminJobBlock(jobId: string, isBlock: boolean): Promise<IJob | null>;
  createSkill(allValues: CreateSkillALL): Promise<ISkill | null>;
  getAdminSkillDb(): Promise<ISkill[] | null>;
  skillBlockDb(skillId: string, isBlock: boolean): Promise<ISkill | null>;
  getSkill(): Promise<ISkill[] | null>;
  userProposalMessageDb(email: string): Promise<ProposalMessageResult | null>;
  getSelectedMessage(
    sender: string,
    receiver: string
  ): Promise<IMessage[] | null>;
  insertMessageDb(values:FrontMessageValues): Promise<IMessage | null>;
}
