import express, { Request, Response } from "express";
import { PostService } from "../service/post";
import { UserService } from "../service/user";
import { Post } from "../model/post";


const postService = new PostService();
const userService = new UserService();

export const postRouter = express.Router();

postRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Post[] | String>
) => {
    try {
        const posts = await postService.getPosts();
        res.status(200).send(posts)
    } catch (e: any) {
        res.status(500).send(e.message)
    }
});

postRouter.post("/", async (
    req: Request<{}, {}, {
        text: string,
        author: string,
        title: string
    }>,
    res: Response<Post | string>
) => {
    try {
        const text = req.body.text;
        if (typeof (text) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- text has type ${typeof (text)}`)
            return;
        }

        const author = req.body.author;
        if (typeof (author) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- author has type ${typeof (author)}`)
            return;
        }
        const user = await userService.getUser();

        const title = req.body.title;
        if (typeof (title) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- title has type ${typeof (title)}`)
            return;
        }

        const newPost = await postService.createPost(text, user, title);
        res.status(201).send(newPost);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
