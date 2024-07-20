export interface updateJobPost {
    jobId: string;
    title?: string;
    description?: string;
    category?: string;
    skillsRequired?: string[];
    budget?: number;
    paymentType?: 'Fixed Price' | 'Hourly';
    duration?: string;
    username?: string;
    email?: string;
    experienceLevel?: 'Beginner' | 'Intermediate' | 'Expert';
    postedDate?: Date;
    deadline?: Date;
    status?: 'Open' | 'Closed';
    image?: string;
  }
  