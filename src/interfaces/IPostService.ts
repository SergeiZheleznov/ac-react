import { IPost } from "./IPost";

export interface IPostService {
  getLastPosts(): Promise<IPost[]>;
  createPost(post: IPost): Promise<IPost>; 
}
