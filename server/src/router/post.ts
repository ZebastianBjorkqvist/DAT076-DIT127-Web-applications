import express, { Request, Response } from "express";
import { PostService } from "../service/post";
import { Post } from "../model/post";
import { User } from "../model/user";


const postService = new PostService();
const userService = new UserService();

export const postRouter = express.Router();

postRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res : Response<Post[] | String>
) => {
    try {
        const posts = await postService.getPosts();
        res.status(200).send(posts)
    } catch (e:any){
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
    try{
        const text = req.body.text;
        if(typeof(text) !== "string"){
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- text has type ${typeof(text)}`)
        }

        const author = req.body.author;
        if(typeof(text) !== "string"){
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- author has type ${typeof(author)}`)
        }
        const user = await userService.getUser(author);

        const title = req.body.title;
        if(typeof(text) !== "string"){
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- title has type ${typeof(title)}`)
        }

        const newPost = await postService.createPost(text, user, title);
        res.status(201).send(newPost);
    } catch (e: any){
        res.status(500).send(e.message);
    }
});
