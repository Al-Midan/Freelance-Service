import express from "express";
import { freelanceController } from "../controller/freelanceController";
import { freelanceRepository } from "../../infrastructure/repository/freelanceRepository";
import { freelanceUseCase } from "../../application/useCase/freelanceUseCase"; 
import multer from 'multer';
const router = express.Router();
const upload = multer();

const repository = new freelanceRepository();
const freelance = new freelanceUseCase(repository);
const controller = new freelanceController(freelance);
router.post('/createJob',upload.single('image'),controller.createJob.bind(controller));

export default router;
