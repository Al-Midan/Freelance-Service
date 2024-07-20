import express from "express";
import { freelanceController } from "../controller/freelanceController";
import { freelanceRepository } from "../../infrastructure/repository/freelanceRepository";
import { freelanceUseCase } from "../../application/useCase/freelanceUseCase";
import multer from "multer";
const router = express.Router();
const upload = multer();

const repository = new freelanceRepository();
const freelance = new freelanceUseCase(repository);
const controller = new freelanceController(freelance);
router.post(
  "/createJob",
  upload.single("image"),
  controller.createJob.bind(controller)
);
router.get("/getAllJob", controller.getALlJob.bind(controller));
router.post(
  "/sendProposal",
  upload.single("cv"),
  controller.proposalPost.bind(controller)
);
router.get("/getUserJobs/:userId", controller.getuserALlJob.bind(controller));
router.get(
  "/GetAllProposals/:userId",
  controller.getAllProposals.bind(controller)
);
router.get(
  "/getJobRequests/:userId",
  controller.getJobRequests.bind(controller)
);
router.post(
  "/proposalStatus/:proposalId",
  controller.proposalStatus.bind(controller)
);
router.get(
  "/jobDetailsWithId/:jobId",
  controller.jobDetailsWithId.bind(controller)
);

export default router;
