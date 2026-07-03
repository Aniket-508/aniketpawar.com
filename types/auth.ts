export interface AuthUser {
  createdAt: Date;
  email: string;
  emailVerified: boolean;
  github_id: number;
  id: string;
  image?: string | null;
  name: string;
  updatedAt: Date;
  username: string;
}
