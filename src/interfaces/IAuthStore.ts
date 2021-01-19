import { IUser } from "./IUser";

export interface IAuthStore {
  currentUser: IUser;
  login: (login: string, password: string) => void;
  authenticate: () => void;
}