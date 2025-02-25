import express, { Request, Response, Router } from "express";
import { PostService } from "../service/post";
import { Post } from "../model/post";
import { isAuthenticated } from "../middleware/authMiddleware";

const postService: PostService = new PostService();

export const postRouter: Router = express.Router();

postRouter.get(
  "/",
  isAuthenticated,
  async (req: Request<{}, {}, {}>, res: Response<Post[] | String>) => {
    try {
      const posts = await postService.getPosts();
      res.status(200).send(posts);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

interface CreatePostRequest extends Request {
  body: { text: string; title: string };
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

      const newPost = await postService.createPost(text, req.session.id, title);
      res.status(201).send(newPost);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

postRouter.delete("/reset", (req: Request, res: Response) => {
  postService.clearPosts(); // This function should reset the list
  res.status(200).send("Post list cleared");
});
