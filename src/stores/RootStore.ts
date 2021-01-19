import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import {makeAutoObservable} from 'mobx';
import { IAuthStore, IPostStore, IRootStore } from '../interfaces';
import { AuthService, PostService } from '../services';
import { AuthStore } from './AuthStore';
import { PostStore } from './PostStore';

export class RootStore implements IRootStore {
  
  public authStore: IAuthStore;
  public postStore: IPostStore;
  
  constructor(){
    makeAutoObservable(this);

    const jwt = localStorage.getItem('jwt');
    const link = createHttpLink({
      uri: 'http://localhost:1337/graphql',
      headers: {
        authorization: jwt ? `Bearer ${jwt}` : '',
      }
    });
    const client = new ApolloClient({
      link,
      cache: new InMemoryCache()
    });

    const postService = new PostService(client);
    const authService = new AuthService(client);

    this.authStore = new AuthStore(authService);
    this.postStore = new PostStore(postService);
  }
}