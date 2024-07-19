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
  async proposalSend(values:proposalPost) {
    const dbresponse = await this.repository.sendProposalDb(values);
    return dbresponse ? dbresponse : null;
  }
}
