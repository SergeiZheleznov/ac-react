import { IUser } from "./IUser";

export interface IAuthService {
  authenticate(): Promise<IUser | undefined>;
  login(email: string, password: string): Promise<void>;
  logout(): void;
}