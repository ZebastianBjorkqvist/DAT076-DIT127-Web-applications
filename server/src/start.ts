import express from "express";
import { postRouter } from "./router/post";
import { userRouter } from "./router/user";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

export const app = express();

dotenv.config();

if (!process.env.SESSION_SECRET) {
  console.log("Could not find SESSION_SECRET in .env file");
  process.exit();
}
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.use("/post", postRouter);
app.use("/user", userRouter);
