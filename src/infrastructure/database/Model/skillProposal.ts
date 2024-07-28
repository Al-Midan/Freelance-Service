import mongoose, { Document, Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

export interface IskillProposal extends Document {
  email: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  description: string;
  status: string;
  image: string;
}

const ProposalSchema: Schema = new Schema({
  OwnerEmail: {
    type: String,
  },
  skillId: {
    type: ObjectId,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default:'pending'
  },
  image: {
    type: String,
  },
});

const skillProposalDb = mongoose.model<IskillProposal>("skillProposals", ProposalSchema);

export default skillProposalDb;
