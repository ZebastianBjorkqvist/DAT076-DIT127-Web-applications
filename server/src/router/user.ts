import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { UserService } from "../service/user";

const userService: UserService = new UserService();

export const userRouter: Router = express.Router();

interface UserRequest extends Request {
  body: { email: string; username: string; password: string };
  session: any;
}

userRouter.get("/", async (req: UserRequest, res: Response) => {
  try {
    const newUser = await userService.getUser();
    res.status(201).send(newUser);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

userRouter.post("/", async (req: UserRequest, res: Response) => {
  try {
    const email = req.body.email;
    if (typeof email !== "string") {
      res
        .status(400)
        .send(
          `Bad PUT call to ${
            req.originalUrl
          } --- email has type ${typeof email}`
        );
      return;
    }

    const password = req.body.password;
    if (typeof password !== "string") {
      res
        .status(400)
        .send(
          `Bad PUT call to ${
            req.originalUrl
          } --- password has type ${typeof password}`
        );
      return;
    }

    const username = req.body.username;
    if (typeof username !== "string") {
      res
        .status(400)
        .send(
          `Bad PUT call to ${
            req.originalUrl
          } --- username has type ${typeof username}`
        );
      return;
    }

    const newUser = await userService.createUser(email, password, username);
    res.status(201).send(newUser);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

userRouter.post("/login", async (req: UserRequest, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (typeof username !== "string") {
      res
        .status(400)
        .send(
          `Bad PUT call to ${
            req.originalUrl
          } --- username has type ${typeof username}`
        );
      return;
    }

    if (typeof password !== "string") {
      res
        .status(400)
        .send(
          `Bad PUT call to ${
            req.originalUrl
          } --- password has type ${typeof password}`
        );
      return;
    }

    const user: User | undefined = await userService.findUser(
      req.body.username,
      req.body.password
    );
    if (!user) {
      res.status(401).send("No such username or password");
      return;
    }
    req.session.username = req.body.username;
    res.status(200).send("Logged in");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
