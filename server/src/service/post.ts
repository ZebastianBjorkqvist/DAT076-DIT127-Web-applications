import { Post } from "../model/post";
import { User } from "../model/user";

export class PostService {
  private posts: Post[] = [];

  async getPosts(): Promise<Post[]> {
    return this.posts;
  }

  async createPost(text: string, author: User, title: string): Promise<Post> {
    if (!text || !title) {
      throw new Error("Text and title are required.");
    }
    if (!author || !author.id || !author.firstName) {
      throw new Error("Valid author is required.");
    }

    const post: Post = {
      id: Date.now(),
      text,
      author,
      title,
    };
    this.posts.push(JSON.parse(JSON.stringify(post)));
    return post;
  }
}
