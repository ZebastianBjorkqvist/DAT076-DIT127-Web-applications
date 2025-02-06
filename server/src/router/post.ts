import express, { Request, Response, Router } from "express";
import { PostService } from "../service/post";
import { Post } from "../model/post";
import { User } from "../model/user";

const postService: PostService = new PostService();

export const postRouter: Router = express.Router();

postRouter.get(
  "/",
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
  async (
    req: Request<
      {},
      {},
      {
        text: string;
        author: User;
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
      if (
        typeof author !== "object" ||
        author === null ||
        typeof author.id !== "number" ||
        typeof author.firstName !== "string" ||
        typeof author.lastName !== "string" ||
        typeof author.email !== "string" ||
        typeof author.password !== "string" ||
        typeof author.userName !== "string"
      ) {
        res
          .status(400)
          .send(
            `Bad POST call to ${req.originalUrl} --- author must be a valid User object`
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
