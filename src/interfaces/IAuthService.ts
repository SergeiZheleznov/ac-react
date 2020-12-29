import { IUser } from "./IUser";

export interface IAuthService {
  authenticate(): Promise<IUser | null>;
  login(email: string, password: string): Promise<void>;
  logout(): void;
}