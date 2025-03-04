import { InferCreationAttributes } from "sequelize";
import { PostModel } from "../db/post.db";
import { Post } from "../model/post";

export class PostService {  

  async getPosts(): Promise<Post[]>{
    const posts = await PostModel.findAll();
    return posts;
  }

  async createPost(text: string, author: string, title: string, topic: string): Promise<Post|undefined> {
    const newPost = await PostModel.create({
      id: Date.now(),
      text: text,
      author: author,
      title: title,
      topic: topic
    } as InferCreationAttributes<PostModel>);

    // Fetch the post with topics included
    const post = await PostModel.findByPk(newPost.id);
    return post ? post : undefined;
  }

  async getPostsByTopic(topic: string): Promise<Post[]> {
    const posts = await PostModel.findAll({ where: { topic: topic } });
    return posts;
  }

}
