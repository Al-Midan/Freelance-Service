export interface CreateSkillALL {
  title: string;
  description: string;
  category: string;
  proficiency: string;
  yearsOfExperience: string;
  availability: string;
  username: string;
  email: string;
  image: UploadedFile;
}

interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
