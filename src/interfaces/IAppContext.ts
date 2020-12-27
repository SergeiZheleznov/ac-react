import { IPostService } from "./IPostService";

export interface IAppContext {
  postService: IPostService | undefined;
}