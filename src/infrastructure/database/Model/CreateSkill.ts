import mongoose, { Document, Schema } from "mongoose";

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

const skillSchema: Schema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  proficiency: {
    type: String,
    enum: ["Beginner", "Intermediate", "Expert"],
  },
  yearsOfExperience: {
    type: Number,
  },
  availability: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Open", "Close"],
    default: "Open",
  },
  isBlock: {
    type: Boolean,
    default: true,
  },
});

const Skill = mongoose.model<ISkill>("Skill", skillSchema);

export default Skill;
