export interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Article {
  _id: string;
  title: string;
  content: string;
  author: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
