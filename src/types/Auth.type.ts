import { Author } from "./Profile.type";


export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  user: Author | null;
}

export interface registerPayload {
  name: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
}

