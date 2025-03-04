import express, { Request, Response, Router } from "express";
import { PostService } from "../service/post";
import { Post } from "../model/post";
import { isAuthenticated } from "../middleware/authMiddleware";
import { Json } from "sequelize/types/utils";

const postService: PostService = new PostService();

export const postRouter: Router = express.Router();

postRouter.get(
  "/",
  isAuthenticated,
  async (
    req: Request<{}, {}, {}, { topic?: string }>,
    res: Response<Post[] | string>
  ) => {
    try {
      const { topic } = req.query;
      if (typeof topic !== "string" && topic !== undefined) {
        res.status(400).send("topic should be of type string");
        return;
      }
      const posts = topic
        ? await postService.getPostsByTopic(topic)
        : await postService.getPosts();
      res.status(200).send(posts);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

interface CreatePostRequest extends Request {
  body: { text: string; title: string; topics: string[] };
  session: any;
}

postRouter.post(
  "/",
  isAuthenticated,
  async (req: CreatePostRequest, res: Response<Post | string>) => {
    try {
      if (!req.session.username) {
        res.status(401).send("Not logged in");
        return;
      }
      const text = req.body.text;
      if (typeof text !== "string") {
        res.status(400).send("description should be a string");
        return;
      }
      const title = req.body.title;
      if (typeof title !== "string") {
        res.status(400).send("title should be a string");
        return;
      }

      const topics = req.body.topics;
      if (
        !Array.isArray(topics) ||
        !topics.every((topic) => typeof topic === "string")
      ) {
        res.status(400).send("topics should be an array of strings");
        return;
      }
      if (topics.length > 10) {
        res.status(400).send("no more than 10 topics is allowed");
      }

      const newPost = await postService.createPost(
        text,
        req.session.username,
        title,
        topics
      );
      if (newPost) {
        res.status(201).send(newPost);
        return;
      }
      res.status(500).send("Server error");
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

postRouter.get(
  "/:postId/likes",
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const postId = parseInt(req.params.postId);
      if (isNaN(postId)) {
        res.status(400).send("Invalid post ID");
      }

      const likes = postService.getNumOfLikes(postId);
      res.status(200).json(likes);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

interface LikePostRequest extends Request {
  body: { like: any };
  session: any;
}

postRouter.post(
  "/:postId/like",
  isAuthenticated,
  async (req: LikePostRequest, res: Response) => {
    try {
      const postId = parseInt(req.params.postId);
      const like = JSON.parse(req.body.like);
      const username = req.session.username;

      if (isNaN(postId)) {
        res.status(400).send("Invalid post ID");
      }

      if (typeof like !== "boolean") {
        res.status(400).send("Invalid like value");
      }

      if (!username) {
        res.status(401).send("Not logged in");
      }

      const updated = await postService.updateLike(postId, username, like);
      if (!updated) {
        res.status(500).send("Could not update like status");
      }

      res.status(200).send("Like status updated");
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);
