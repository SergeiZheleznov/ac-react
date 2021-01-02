import {
  IPost,
  IPostHelper
} from "../interfaces";

export class PostHelper implements IPostHelper {
  public getHtml(post: IPost): string {
    return post.source;
  }
  
}