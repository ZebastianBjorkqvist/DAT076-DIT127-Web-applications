import express from "express";
import { postRouter } from "./router/post";
import { userRouter } from "./router/user";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use("/post", postRouter);
app.use("/user", userRouter);
