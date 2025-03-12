import { InferCreationAttributes } from "sequelize";
import { PostModel } from "../db/post.db";
import { Post } from "../model/post";

export class PostService {
  async getPosts(): Promise<Post[]> {
    const posts = await PostModel.findAll({
      order: [["createdAt", "DESC"]],
    });
    return posts;
  }

  async createPost(
    text: string,
    author: string,
    title: string,
    topics: string[]
  ): Promise<Post | undefined> {
    const newPost = await PostModel.create({
      id: Date.now(),
      text: text,
      author: author,
      title: title,
      topics: topics,
    } as InferCreationAttributes<PostModel>);

    const post = await PostModel.findByPk(newPost.id);
    return post ? post : undefined;
  }

  async getPostsByTopic(topic: string): Promise<PostModel[]> {
    try {
      const allPosts = await PostModel.findAll();

      const filteredPosts = allPosts.filter((post) =>
        post.topics.includes(topic)
      );

      return filteredPosts;
    } catch (error) {
      console.error("Error fetching posts by topic:", error);
      throw error;
    }
  }

  async updateLike(
    postId: number,
    username: string,
    like: boolean
  ): Promise<boolean> {
    try {
      const post = await PostModel.findByPk(postId);
      if (!post) {
        console.error(`Post with id ${postId} not found`);
        throw new Error("Post not found");
      }

      let updatedLikedBy: string[];
      if (like) {
        updatedLikedBy = post.likedBy.includes(username)
          ? post.likedBy
          : [...post.likedBy, username];
      } else {
        updatedLikedBy = post.likedBy.filter((user) => user !== username);
      }

      await post.update({ likedBy: updatedLikedBy });

      return true;
    } catch (error) {
      return false;
    }
  }

  async getLikeData(
    postId: number,
    username: string
  ): Promise<{ likeCount: number; userLiked: boolean }> {
    const post = await PostModel.findByPk(postId);

    if (!post) {
      console.error("Error getting likedata");
      return { likeCount: 0, userLiked: false };
    }
    const count: number = post.likedBy.length;
    const liked: boolean = post.likedBy.includes(username);

    return { likeCount: count, userLiked: liked };
  }

  async deleteAllPosts(): Promise<boolean> {
    try {
      await PostModel.destroy({ where: {} }); // Empty `where` clause deletes all rows
      return true;
    } catch (e) {
      console.error("Error deleting all posts:", e);
      return false;
    }
  }
}
