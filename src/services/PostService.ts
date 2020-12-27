import { IPost, IPostService } from "../interfaces";

export class PostService implements IPostService {
  getLastPosts(): Promise<IPost[]> {
    throw new Error("Method not implemented.");
  }

}