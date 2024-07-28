export interface SkillProposal {
    email: string;
    skillId: string;
    description: string;
    Image: UploadedFile;
  }
  
  interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  }