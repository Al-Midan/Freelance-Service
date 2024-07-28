export interface UpdateSkill {
  skillId: string;
  title?: string;
  description?: string;
  category?: string;
  proficiency?: "Beginner" | "Intermediate" | "Expert";
  yearsOfExperience?: number;
  availability?: string;
  username?: string;
  email?: string;
  dateAdded?: Date;
  image?: string;
  status?: "Open" | "Close";
  isBlock?: boolean;
}
