export interface ProposalMessageResult {
  senderEmail: string;
  receiverDetails: Array<{ _id: string; username: string; email: string }>;
}
