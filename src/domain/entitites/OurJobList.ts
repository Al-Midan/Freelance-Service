import mongoose, { Document } from 'mongoose';

// Define interface for dbValues
export interface IDbValues extends Document {
  userId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  jobOwner: string;
  jobOwnerEmail: string;
  proposalDescription: string;
  proposalStatus: string;
  proposalImage: string;
}

// Define interface for jobDocuments
export interface IJobDocuments extends Document {
  title: string;
  description: string;
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
  status: 'Open' | 'Closed';
  image: string;
}

export type CombinedValues = {
  dbValues: IDbValues[] | null;
  jobDocuments: IJobDocuments[] | null;
};
