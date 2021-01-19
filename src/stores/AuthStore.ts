import {makeAutoObservable} from 'mobx';
import { IAuthService, IAuthStore } from '../interfaces';
import { IUser } from '../interfaces/IUser';

export class AuthStore implements IAuthStore{
   
  public currentUser: IUser  = {
    id: 0,
    username: '',
    email: ''
  };

  constructor(private authService: IAuthService){
    makeAutoObservable(this);
  }

  public async authenticate() {
    const user = await this.authService.authenticate();
    if (user){
      this.currentUser = user;
    }    
  }

  public async login(email: string, password: string) {
    await this.authService.login(email, password);
    this.authenticate();
    return;
  }
}