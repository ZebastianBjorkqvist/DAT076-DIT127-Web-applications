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
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        userName: string;
      }
    >,
    res: Response<User | string>
  ) => {
    try {
      const firstName = req.body.firstName;
      if (typeof firstName !== "string") {
        res
          .status(400)
          .send(
            `Bad PUT call to ${
              req.originalUrl
            } --- text has type ${typeof firstName}`
          );
        return;
      }

      const lastName = req.body.lastName;
      if (typeof lastName !== "string") {
        res
          .status(400)
          .send(
            `Bad PUT call to ${
              req.originalUrl
            } --- author has type ${typeof lastName}`
          );
        return;
      }

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

      const userName = req.body.userName;
      if (typeof userName !== "string") {
        res
          .status(400)
          .send(
            `Bad PUT call to ${
              req.originalUrl
            } --- title has type ${typeof userName}`
          );
        return;
      }

      const newUser = await userService.createUser(
        firstName,
        lastName,
        email,
        password,
        userName
      );
      res.status(201).send(newUser);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);
