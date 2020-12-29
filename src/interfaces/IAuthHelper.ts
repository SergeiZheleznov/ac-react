export interface IAuthHelper {
  getToken(): string | null;
  setToken(token: string): void;
  clearToken(): void;
}