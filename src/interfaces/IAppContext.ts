import { IAuthService } from "./IAuthService";
import { IPostService } from "./IPostService";
import { IUser } from "./IUser";

export interface IAppContext {
  postService: IPostService | undefined;
  authService: IAuthService | undefined;
  currentUser: IUser | undefined;
}