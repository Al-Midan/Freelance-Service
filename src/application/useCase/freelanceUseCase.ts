import { CreateJob } from "../../domain/entitites/createJob";
import { CreateSkillALL } from "../../domain/entitites/createSkill";
import { FrontMessageValues } from "../../domain/entitites/MessageValues ";
import { proposalPost } from "../../domain/entitites/sendProposal";
import { SkillPaymentRequest } from "../../domain/entitites/SkillPayment";
import { SkillProposal } from "../../domain/entitites/skillProposal";
import { updateJobPost } from "../../domain/entitites/updateJob";
import { updateMessageValue } from "../../domain/entitites/updateMessage";
import { UpdateSkill } from "../../domain/entitites/updateSkill";
import { IfreelanceRepository } from "../../infrastructure/interface/IfreelanceRepository";
import { IfreelanceUseCase } from "../interface/IfreelanceUseCase";

export class freelanceUseCase implements IfreelanceUseCase {
  private repository: IfreelanceRepository;

  constructor(repository: IfreelanceRepository) {
    this.repository = repository;
  }
  async CreateJob(values: CreateJob) {
    const dbresponse = await this.repository.createJob(values);
    return dbresponse ? dbresponse : null;
  }
  async getAllJob() {
    const dbresponse = await this.repository.GetJob();
    return dbresponse ? dbresponse : null;
  }
  async getAllAdminJob() {
    const dbresponse = await this.repository.getAllAdminJob();
    return dbresponse ? dbresponse : null;
  }
  async proposalSend(values: proposalPost) {
    const dbresponse = await this.repository.sendProposalDb(values);
    return dbresponse ? dbresponse : null;
  }
  async skillProposal(values: SkillProposal) {
    const dbresponse = await this.repository.skillProposal(values);
    return dbresponse ? dbresponse : null;
  }
  async getuserAllJobs(userId: string) {
    const dbresponse = await this.repository.getUserJobsDb(userId);
    return dbresponse ? dbresponse : null;
  }
  async getuserAllSkills(userId: string) {
    const dbresponse = await this.repository.getUserSkillsDb(userId);
    return dbresponse ? dbresponse : null;
  }
  async getAllProposals(userId: string) {
    const dbresponse = await this.repository.getAllProposals(userId);
    return dbresponse ? dbresponse : null;
  }
  async getAllSkillProposals(userId: string) {
    const dbresponse = await this.repository.getAllSkillProposals(userId);
    return dbresponse ? dbresponse : null;
  }
  async getJobRequests(userId: string) {
    const dbresponse = await this.repository.getJobRequests(userId);
    return dbresponse ? dbresponse : null;
  }
  async getSkillRequests(userId: string) {
    const dbresponse = await this.repository.getSkillRequests(userId);
    return dbresponse ? dbresponse : null;
  }
  async changeProposalStatus(proposalId: string, action: string) {
    const dbresponse = await this.repository.proposalStatusDb(
      proposalId,
      action
    );
    return dbresponse ? dbresponse : null;
  }
  async changeSkillProposalStatus(proposalId: string, action: string) {
    const dbresponse = await this.repository.skillProposalStatusDb(
      proposalId,
      action
    );
    return dbresponse ? dbresponse : null;
  }
  async jobDetailsWithId(jobId: string) {
    const dbresponse = await this.repository.jobdetailsDb(jobId);
    return dbresponse ? dbresponse : null;
  }
  async SkillDetailsWithId(SkillId: string) {
    const dbresponse = await this.repository.skilldetailsDb(SkillId);
    return dbresponse ? dbresponse : null;
  }
  async UpdateJob(values: updateJobPost) {
    const dbresponse = await this.repository.UpdateJobDb(values);
    return dbresponse ? dbresponse : null;
  }
  async UpdateSkill(values: UpdateSkill) {
    const dbresponse = await this.repository.UpdateSkillDb(values);
    return dbresponse ? dbresponse : null;
  }
  async deleteJob(jobId: string) {
    const dbresponse = await this.repository.deleteJobDb(jobId);
    return dbresponse ? dbresponse : null;
  }
  async deleteSkill(skillId: string) {
    const dbresponse = await this.repository.deleteSkillDb(skillId);
    return dbresponse ? dbresponse : null;
  }
  async adminJobBlock(jobId: string, isBlock: boolean) {
    const dbresponse = await this.repository.adminJobBlock(jobId, isBlock);
    return dbresponse ? dbresponse : null;
  }
  async createSkill(allValues: CreateSkillALL) {
    const dbresponse = await this.repository.createSkill(allValues);
    return dbresponse ? dbresponse : null;
  }
  async getAdminSkill() {
    const dbresponse = await this.repository.getAdminSkillDb();
    return dbresponse ? dbresponse : null;
  }
  async getSkill() {
    const dbresponse = await this.repository.getSkill();
    return dbresponse ? dbresponse : null;
  }
  async skillBlock(skillId: string, isBlock: boolean) {
    const dbresponse = await this.repository.skillBlockDb(skillId, isBlock);
    return dbresponse ? dbresponse : null;
  }
  async userProposalMessage(email:string){
    const dbresponse = await this.repository.userProposalMessageDb(email);
    return dbresponse ? dbresponse : null;
  }
  async getSelectedMessage( sender: string,receiver: string){
    const dbresponse = await this.repository.getSelectedMessage(sender,receiver);
    return dbresponse ? dbresponse : null;
  }
  async insertMessage(values:FrontMessageValues){
    const dbresponse = await this.repository.insertMessageDb(values);
    return dbresponse ? dbresponse : null;
  }
  async  updateMessage(values:updateMessageValue){
    const dbresponse = await this.repository.updateMessageDb(values);
    return dbresponse ? dbresponse : null;
  }
  async skillPayment(values:SkillPaymentRequest){
    const dbresponse = await this.repository.skillPayment(values);
    return dbresponse ? dbresponse : null;
  }
}
