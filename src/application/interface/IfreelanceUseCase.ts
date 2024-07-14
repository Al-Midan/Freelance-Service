import { CreateJob } from "../../domain/entitites/createJob";
import { IJob } from "../../infrastructure/database/Model/CreateJob";

export interface IfreelanceUseCase {
    CreateJob(values:CreateJob): Promise<IJob | null>;
}
