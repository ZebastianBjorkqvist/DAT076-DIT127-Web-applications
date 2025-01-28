import { Post } from "../model/post";
import { User } from "../model/user";

export class PostService {
  private posts: Post[] = [];

  async getPosts(): Promise<Post[]> {
    return this.posts;
  }

  async createPost(text: string, author: User, title: string): Promise<Post> {
    const post = {
      id: Date.now(),
      text: text,
      author: author,
      title: title,
    };
    this.posts.push(post);
    return post;
  }
}
