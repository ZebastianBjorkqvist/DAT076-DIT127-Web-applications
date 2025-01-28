import express from "express";
import { postRouter } from "./router/post";

export const app = express();

app.use(express.json());
app.use("/post", postRouter);
