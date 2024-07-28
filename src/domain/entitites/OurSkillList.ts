import mongoose, { Document } from 'mongoose';

export interface IskillProposal extends Document {
    email: string;
    skillId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    description: string;
    status: string;
    image: string;
  }
  


  export interface ISkill extends Document {
    title: string;
    description: string;
    category: string;
    proficiency: "Beginner" | "Intermediate" | "Expert";
    yearsOfExperience: number;
    availability: string; 
    username: string;
    email: string;
    dateAdded: Date;
    image: string;
    status: "Open" | "Close";
    isBlock: boolean;
  }

  export type CombinedSkillValues = {
    dbValues: IskillProposal[] | null;
    jobDocuments: ISkill[] | null;
  };