import { CreateJob } from "../../domain/entitites/createJob";
import { proposalPost } from "../../domain/entitites/sendProposal";
import { IJob } from "../../infrastructure/database/Model/CreateJob";

export interface IfreelanceUseCase {
  CreateJob(values: CreateJob): Promise<IJob | null>;
  getAllJob(): Promise<IJob[] | null>;
  proposalSend(values:proposalPost):any;
}
