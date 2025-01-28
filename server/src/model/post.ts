import { User } from "./user";

export interface Post {
  id: number;
  text: string;
  author: User;
  title: string;
}
