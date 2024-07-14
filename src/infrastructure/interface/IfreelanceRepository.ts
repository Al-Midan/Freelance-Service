import { CreateJob } from "../../domain/entitites/createJob";
import { IJob } from "../database/Model/CreateJob";

export interface IfreelanceRepository {
  createJob(values: CreateJob): Promise<IJob | null>;
  GetJob(): Promise<IJob[] | null>;
}
