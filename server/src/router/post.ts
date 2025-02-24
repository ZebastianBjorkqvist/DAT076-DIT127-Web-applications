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

postRouter.post(
  "/",
  isAuthenticated,
  async (
    req: Request<
      {},
      {},
      {
        text: string;
        author: number;
        title: string;
      }
    >,
    res: Response<Post | string>
  ) => {
    try {
      const { text, author, title } = req.body;
      if (typeof text !== "string") {
        res
          .status(400)
          .send(
            `Bad PUT call to ${
              req.originalUrl
            } --- text has type ${typeof text}`
          );
        return;
      }

      // Validera att author är ett objekt och har rätt User-struktur
      if (typeof author !== "number") {
        res
          .status(400)
          .send(
            `Bad POST call to ${req.originalUrl} --- author must be a of type number`
          );
        return;
      }

      if (typeof title !== "string") {
        res
          .status(400)
          .send(
            `Bad PUT call to ${
              req.originalUrl
            } --- title has type ${typeof title}`
          );
        return;
      }

      const newPost = await postService.createPost(text, author, title);
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
