import { IAuthHelper } from "../interfaces";
const JWT_KEY = 'jwt';

export const AuthHelper: IAuthHelper = {
  getToken: () => {
    return localStorage.getItem(JWT_KEY);
  },
  setToken: (token: string): void => {
    localStorage.setItem(JWT_KEY, token);
  },
  clearToken(): void {
    localStorage.removeItem(JWT_KEY);
  }
}