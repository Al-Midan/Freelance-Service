import { CreateJob } from "../../domain/entitites/createJob";
import { proposalPost } from "../../domain/entitites/sendProposal";
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
  async proposalSend(values: proposalPost) {
    const dbresponse = await this.repository.sendProposalDb(values);
    return dbresponse ? dbresponse : null;
  }
  async getuserAllJobs(userId: string) {
    const dbresponse = await this.repository.getUserJobsDb(userId);
    return dbresponse ? dbresponse : null;
  }
  async getAllProposals(userId: string) {
    const dbresponse = await this.repository.getAllProposals(userId);
    return dbresponse ? dbresponse : null;
  }
  async getJobRequests(userId: string) {
    const dbresponse = await this.repository.getJobRequests(userId);
    return dbresponse ? dbresponse : null;
  }
  async changeProposalStatus(proposalId: string,action: string) {
    const dbresponse = await this.repository.proposalStatusDb(proposalId,action);
    return dbresponse ? dbresponse : null;
  }
}
