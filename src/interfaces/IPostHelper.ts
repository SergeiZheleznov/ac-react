import { IPost } from "./";

export interface IPostHelper {
  getHtml(post: IPost): string;
}