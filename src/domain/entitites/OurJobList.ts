import mongoose, { Document } from 'mongoose';

export interface IMergedJobProposal extends Document {
  // Fields from IProposal
  userId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  jobOwner: string;
  jobOwnerEmail: string;
  proposalDescription: string;
  proposalStatus: string;
  proposalImage: string;

  // Fields from IJob
  title: string;
  jobDescription: string;
  category: string;
  skillsRequired: string[];
  budget: number;
  paymentType: 'Fixed Price' | 'Hourly';
  duration: string;
  username: string;
  email: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Expert';
  postedDate: Date;
  deadline: Date;
  jobStatus: 'Open' | 'Closed';
  jobImage: string;
}
