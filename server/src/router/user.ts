import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { UserService } from "../service/user";

const userService: UserService = new UserService();

export const userRouter: Router = express.Router();

userRouter.get(
  "/",
  async (req: Request<{}, {}, {}>, res: Response<User | string>) => {
    try {
      const newUser = await userService.getUser();
      res.status(201).send(newUser);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

userRouter.post(
  "/",
  async (
    req: Request<
      {},
      {},
      {
        email: string;
        password: string;
        username: string;
      }
    >,
    res: Response<User | string>
  ) => {
    try {

      const email = req.body.email;
      if (typeof email !== "string") {
        res
          .status(400)
          .send(
            `Bad PUT call to ${
              req.originalUrl
            } --- title has type ${typeof email}`
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
            } --- title has type ${typeof password}`
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
            } --- title has type ${typeof username}`
          );
        return;
      }

      const newUser = await userService.createUser(
        email,
        password,
        username
      );
      res.status(201).send(newUser);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

userRouter.post(
  "/login",
  async (
    req: Request<
      {},
      {},
      {
        userOrEmail: string;
        password: string;
      }
    >,
    res: Response<boolean | string>
  ) => {
    try {

      const userOrEmail = req.body.userOrEmail;
      if (typeof userOrEmail !== "string") {
        res
          .status(400)
          .send(
            `Bad PUT call to ${
              req.originalUrl
            } --- title has type ${typeof userOrEmail}`
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
            } --- title has type ${typeof password}`
          );
        return;
      }

      const isLoggedIn = await userService.login(
        userOrEmail,
        password,
      );
      res.status(201).send(isLoggedIn);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);
