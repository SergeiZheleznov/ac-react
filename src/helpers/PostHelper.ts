import {
  IContentBlock,
  IPost,
  IPostHelper
} from "../interfaces";

export const PostHelper: IPostHelper = {
  getHtml: (post: IPost): string => {
    return post.source;
  },
  getContentBlocks: (post: IPost): IContentBlock[] => {
    
    return [];
  }
}