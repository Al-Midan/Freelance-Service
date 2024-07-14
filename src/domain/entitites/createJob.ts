export interface CreateJob {
    title: string;
    description: string;
    category: string;
    skillsRequired: string | string[];
    budget: string;
    paymentType: string;
    duration: string;
    experienceLevel: string;
    postedDate:string | Date;
    deadline: string | Date;
    status: string;
    username: string;
    email: string;
    image:CreateJobFile
  }
  
  interface CreateJobFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  }