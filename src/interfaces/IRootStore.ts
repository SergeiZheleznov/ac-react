import { IAuthStore } from ".";
import { IPostStore } from "./IPostStore";

export interface IRootStore {
  authStore: IAuthStore;
  postStore: IPostStore;
}