import { Post } from "../model/post";
import { User } from "../model/user";

export class PostService {
  private posts: Post[] = [];

  async getPosts(): Promise<Post[]> {
    return this.posts;
  }

  async createPost(text: string, author: number, title: string): Promise<Post> {
    const post: Post = {
      id: Date.now(),
      text,
      author,
      title,
    };
    this.posts.push(JSON.parse(JSON.stringify(post)));
    return post;
  }

  clearPosts(): void {
    this.posts = [];
  }
}
