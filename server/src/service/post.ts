import { InferCreationAttributes } from "sequelize";
import { PostModel } from "../db/post.db";
import { Post } from "../model/post";
import { Op } from 'sequelize';


export class PostService {  

  async getPosts(): Promise<Post[]>{
    const posts = await PostModel.findAll();
    return posts;
  }

  async createPost(text: string, author: string, title: string, topics: string[]): Promise<Post|undefined> {
    const newPost = await PostModel.create({
      id: Date.now(),
      text: text,
      author: author,
      title: title,
      topics: topics
    } as InferCreationAttributes<PostModel>);

    // Fetch the post with topics included
    const post = await PostModel.findByPk(newPost.id);
    return post ? post : undefined;
  }

  async getPostsByTopic(topic: string): Promise<Post[]> {
    const posts = await PostModel.findAll({ where: { topics:  {[Op.contains]: [topic]}} });
    return posts;
  }

}
