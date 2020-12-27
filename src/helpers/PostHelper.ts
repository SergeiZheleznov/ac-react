import {
  IPost,
  IPostHelper
} from "../interfaces";

export default class PostHelper implements IPostHelper {
  
  public getHtml(post: IPost): string {
    return post.source;
  }
}