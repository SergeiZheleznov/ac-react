export interface IPost {
  id: number;
  title: string;
  source: string;
}

export const postDefault: IPost = {
  id: -1,
  title: '',
  source: ''
}