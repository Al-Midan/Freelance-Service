import mongoose, { Document, Schema } from "mongoose";

export interface IJob extends Document {
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
  image:string;
}

const jobSchema: Schema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  skillsRequired: {
    type: [String],
  },
  budget: {
    type: Number,
  },
  paymentType: {
    type: String,
    enum: ['Fixed Price', 'Hourly'],
  },
  duration: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  experienceLevel: {
    type: String,
    enum: ['Entry Level', 'Intermediate', 'Expert'],
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Open', 'Closed'],
  },
  image: {
    type: String,
  },
});

const Job = mongoose.model<IJob>("Job", jobSchema);

export default Job;
