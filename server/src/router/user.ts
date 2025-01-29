import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { UserService } from "../service/user";

const userService : UserService = new UserService();

export const userRouter : Router = express.Router();

userRouter.post("/", async (
    req: Request<{}, {}, {


    }>,
    res: Response<User | string>
) => {
    try{

        const newPost = await userService.getUser();
        res.status(201).send(newPost);
    } catch (e: any){
        res.status(500).send(e.message);
    }
});


