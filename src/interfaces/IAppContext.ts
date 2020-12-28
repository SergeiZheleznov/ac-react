import { IAuthService } from "./IAuthService";
import { IPostService } from "./IPostService";

export interface IAppContext {
  postService: IPostService | undefined;
  authService: IAuthService | undefined;
}