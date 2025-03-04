import express, { Request, Response, Router } from "express";
import { PostService } from "../service/post";
import { Post } from "../model/post";
import { isAuthenticated } from "../middleware/authMiddleware";

const postService: PostService = new PostService();

export const postRouter: Router = express.Router();

postRouter.get(
  "/",
  isAuthenticated,
  async (req: Request<{}, {}, {}, { topic?: string }>, res: Response<Post[] | string>) => {
    try {
      const { topic } = req.query;
      if (typeof topic !== 'string' && topic !== undefined) {
        res.status(400).send('topic should be of type string');
        return;
      }
      const posts = topic ? await postService.getPostsByTopic(topic) : await postService.getPosts();
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
      if (!Array.isArray(topics) || !topics.every(topic => typeof topic === "string")) {
        res.status(400).send("topics should be an array of strings");
        return;
      }
      if(topics.length > 10){
        res.status(400).send("no more than 10 topics is allowed");
      }

      const newPost = await postService.createPost(text, req.session.username, title, topics);
      if(newPost){
        res.status(201).send(newPost);
        return;
      }
      res.status(500).send("Server error");
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);
