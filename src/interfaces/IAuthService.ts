import { IUser } from "./IUser";

export interface IAuthService {
  authenticate(email: string, password: string): Promise<IUser>;
}