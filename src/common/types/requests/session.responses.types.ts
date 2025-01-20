import { Session } from "../objects/session.types";

export interface SessionResponse {
  accessToken: string;
  refreshToken: string;
  csrfToken: string;
  user: {
    id: string;
    email: string;
    isEmailVerified: boolean;
    lastLogin?: string;
    loginCount?: number;
  };
  session: Session;
}
