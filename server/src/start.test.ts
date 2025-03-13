import * as SuperTest from "supertest";
import { app } from "./start";
import { Post } from "./model/post";
import { User } from "./model/user";
import exp from "constants";
import { initDB } from "./db/conn";

const request = SuperTest.default(app);
let cookie: string[];

beforeAll(async () => {
  await initDB();
});

test("After we create a post, it should appear in the list of posts", async () => {
  const createUserRes = await request
    .post("/user")
    .send({ email: "test@test.com", username: "test", password: "test" });
  expect(createUserRes.status).toStrictEqual(201);

  const loginRes = await request
    .post("/user/login")
    .send({ username: "test", password: "test" });
  expect(loginRes.status).toStrictEqual(200);
  cookie = loginRes.get("Set-Cookie") as string[];
  expect(cookie).toBeTruthy();
  const testText = "Test the whole server";

  const postRes = await request
    .post("/post")
    .set("Cookie", cookie)
    .send({ text: testText, title: "testingpost title", topics: [] });
  console.log(postRes);
  expect(postRes.status).toStrictEqual(201);
  expect(postRes.body.text).toStrictEqual(testText);

  const postGetRes = await request.get("/post").set("Cookie", cookie);
  expect(postGetRes.status).toStrictEqual(200);
  expect(
    postGetRes.body.some((post: Post) => post.text === testText)
  ).toBeTruthy();
});
