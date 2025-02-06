import express from "express";
import { postRouter } from "./router/post";
import { userRouter } from "./router/user";

export const app = express();

app.use(express.json());
app.use("/post", postRouter);
app.use("/user", userRouter);
