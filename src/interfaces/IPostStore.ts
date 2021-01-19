import { IPost } from ".";

export interface IPostStore {
  posts: IPost[];
  getAll(): Promise<void>;
}