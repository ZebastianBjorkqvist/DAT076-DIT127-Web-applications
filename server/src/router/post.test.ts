import * as SuperTest from "supertest";
import { app } from "../start";
const request = SuperTest.default(app);

test("POST /post - should create a new post", async () => {
  const newPostInput = {
    text: "New Post",
    title: "New Title",
    author: {
      id: Date.now(),
      firstName: "Test",
      lastName: "User",
      email: "test.user@gmail.com",
      password: "testpass",
    },
  };

  const res = await request.post("/post").send(newPostInput);
  expect(res.statusCode).toBe(201);
  expect(res.body.text).toEqual(newPostInput.text);
  expect(res.body.title).toEqual(newPostInput.title);
  expect(res.body.author).toEqual(newPostInput.author);
});

test("GET /post - should return all posts", async () => {
  const res = await request.get("/post");

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toEqual(1);
});

test("POST /post - should return 400 for invalid text input", async () => {
  const invalidPostInput = {
    text: 123, // Invalid type
    title: "New Title",
    author: {
      id: Date.now(),
      firstName: "Test",
      lastName: "User",
      email: "test.user@gmail.com",
      password: "testpass",
    },
  };

  const res = await request.post("/post").send(invalidPostInput);

  expect(res.statusCode).toBe(400);
  expect(res.text).toContain("Bad PUT call to");
});

test("POST /post - should return 400 for invalid title input", async () => {
  const invalidPostInput = {
    text: "New Post",
    title: 123, // Invalid type
    author: {
      id: Date.now(),
      firstName: "Test",
      lastName: "User",
      email: "test.user@gmail.com",
      password: "testpass",
    },
  };

  const res = await request.post("/post").send(invalidPostInput);

  expect(res.statusCode).toBe(400);
  expect(res.text).toContain("Bad PUT call to");
});
