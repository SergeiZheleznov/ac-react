import { IContentBlock, IPost } from "./";

export interface IPostHelper {
  getHtml(post: IPost): string;
  getContentBlocks(post: IPost): IContentBlock[];
}