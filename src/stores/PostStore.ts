import {makeAutoObservable} from 'mobx';
import { IPost, IPostService, IPostStore } from '../interfaces';


export class PostStore implements IPostStore {
  
  public posts: IPost[] = [];
  
  constructor(private postService: IPostService){
    makeAutoObservable(this);
  }
  
  public async getAll(): Promise<void> {
    this.posts = await this.postService.getLastPosts();
  }
}