import mongoose, { Document, Schema } from 'mongoose';

export interface ISkillTransaction extends Document {
  sender: string;
  receiver: string;
  amount: number;
  paymentId: string;
  timestamp: Date;
}

const TransactionSchema: Schema = new Schema({
  sender: { type: String },
  receiver: { type: String },
  amount: { type: Number },
  paymentId: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const SkillTransactionDb = mongoose.model<ISkillTransaction>('SkillTransaction', TransactionSchema);
export default SkillTransactionDb;