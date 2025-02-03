import * as SuperTest from "supertest";
import { app } from "./start";
import { Post } from "./model/post";
import { User } from "./model/user";

const request = SuperTest.default(app);

test("End-to-end test", async () => {
  const authorObject : User = {
    id: Date.now(),
    firstName: "Test",
    lastName: "User",
    email: "test.user@gmail.com",
    password: "testpass",
    userName: "testuser"
  }

  const testCreatePostInput = {
    text: "This is a test post",
    author: authorObject,
    title: "Test title"
  }

  const res1 = await request.post("/post").send(testCreatePostInput);
  expect(res1.statusCode).toEqual(201);
  expect(res1.body.text).toEqual(testCreatePostInput.text);
  expect(res1.body.author).toEqual(authorObject);
  expect(res1.body.title).toEqual(testCreatePostInput.title);

  const res2 = await request.get("/post");
  expect(res2.statusCode).toEqual(200);
  expect(res2.body.map((post: Post) => post.title)).toContain(testCreatePostInput.title);
});
