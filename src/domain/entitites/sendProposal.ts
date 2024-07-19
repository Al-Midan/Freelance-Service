export interface proposalPost {
  userId: string;
  jobId: string;
  jobOwner: string;
  jobOwnerEmail: string;
  description: string;
  cvImage: UploadedFile;
}

interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
