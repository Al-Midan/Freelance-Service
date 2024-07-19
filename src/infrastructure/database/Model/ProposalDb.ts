import mongoose, { Document, Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

export interface IProposal extends Document {
  userId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  jobOwner: string;
  jobOwnerEmail: string;
  description: string;
  status: string;
  image: string;
}

const ProposalSchema: Schema = new Schema({
  userId: {
    type: ObjectId,
  },
  jobId: {
    type: ObjectId,
  },
  jobOwner: {
    type: String,
  },
  jobOwnerEmail: {
    type: String,
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

const ProposalDb = mongoose.model<IProposal>("Proposals", ProposalSchema);

export default ProposalDb;
