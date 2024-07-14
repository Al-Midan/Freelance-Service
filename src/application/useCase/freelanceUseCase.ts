import { CreateJob } from "../../domain/entitites/createJob";
import { IfreelanceRepository } from "../../infrastructure/interface/IfreelanceRepository";
import { IfreelanceUseCase } from "../interface/IfreelanceUseCase";

export class freelanceUseCase implements IfreelanceUseCase {
  private repository: IfreelanceRepository;

  constructor(repository: IfreelanceRepository) {
    this.repository = repository;
  }
   async CreateJob(values :CreateJob){
    const dbresponse =  await this.repository.createJob(values);
    return dbresponse ? dbresponse : null;
   }

}
