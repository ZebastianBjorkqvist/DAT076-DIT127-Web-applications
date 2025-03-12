import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { UserService } from "../service/user";

const userService: UserService = new UserService();

export const userRouter: Router = express.Router();

interface UserRequest extends Request {
  body: { email: string; username: string; password: string };
  session: any;
}

userRouter.get("/current", async (req: UserRequest, res: Response) => {
  try {
    if (req.session.username) {
      userService.findUser(req.session.username).then((user) => {
        if (!user) {
          res.status(401).send("Not authenticated");
          return;
        }
        res.status(200).send({
          username: user.username,
          email: user.email,
          numbr_of_posts: user.numbr_of_posts ?? 0,
          numbr_of_likes: user.numbr_of_likes,
        });
      });
    } else {
      res.status(401).send("Not authenticated");
    }
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (typeof email !== "string" || !email.includes("@")) {
      res.status(400).send("Invalid email format");
      return;
    }

    if (typeof password !== "string" || password.length < 2) {
      res.status(400).send("Password must be at least 2 characters long");
      return;
    }

    if (typeof username !== "string" || username.length < 2) {
      res.status(400).send("Username must be at least 2 characters long");
      return;
    }

    const newUser = await userService.createUser(email, password, username);

    res.status(201).send(newUser);
    return;
  } catch (e: any) {
    if (e.message === "Username already exists") {
      res.status(409).send(e.message);
      return;
    }
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

userRouter.get("/check-auth", (req: UserRequest, res: Response) => {
  if (req.session.username) {
    res.status(200).send({ username: req.session.username });
  } else {
    res.status(401).send("Not authenticated");
  }
});

userRouter.post("/logout", (req: UserRequest, res: Response) => {
  req.session.destroy((err: any) => {
    if (err) {
      return res.status(500).send("Failed to log out");
    }
    res.status(200).send("Logged out");
  });
});

if (process.env.NODE_ENV === "test") {
  userRouter.delete("/reset", async (req: Request, res: Response) => {
    try {
      const success = await userService.deleteAllUsers();
      if (success) {
        res.status(200).send("All users deleted");
      } else {
        res.status(500).send("Failed to delete users");
      }
    } catch (err: any) {
      res.status(500).send(`Error deleting users: ${err.message}`);
    }
  });
}
