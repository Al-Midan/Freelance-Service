import { NextFunction, Request, Response } from "express";
import { IfreelanceUseCase } from "../../application/interface/IfreelanceUseCase";


export class freelanceController {
  private freelanceService: IfreelanceUseCase;
  constructor(freelanceService: IfreelanceUseCase) {
    this.freelanceService = freelanceService;
  }
 async createJob(req:Request, res:Response){
  try {
    console.log("createJob",req.body);
    console.log("createJob File",req.file);
    let image =  req.file
    let rest =  req.body
    const values = {image,...rest}
    const response = await this.freelanceService.CreateJob(values);
    res.status(200).json({message:"Job Created Successfully",response})
  } catch (error) {
    console.error("Error occured in creating Job", error);
    res.status(500).json({message:"Job Creation Failed"})
  }
 }
}
