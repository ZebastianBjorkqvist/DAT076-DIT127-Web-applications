import * as SuperTest from "supertest";
import { app } from "../start";

const request = SuperTest.default(app);

beforeEach(async () => {
  await request.delete("/post/reset");

});

test("POST /post - should create a new post", async () => {
  const newPostInput = {
    text: "New Post",
    title: "New Title",
    author: Date.now()
  };

  const res = await request.post("/post").send(newPostInput);
  expect(res.statusCode).toBe(201);
  expect(res.body.text).toEqual(newPostInput.text);
  expect(res.body.title).toEqual(newPostInput.title);
  expect(res.body.author).toEqual(newPostInput.author);
});

test("GET /post - should return all posts", async () => {
  const newPostInput = {
    text: "New Post",
    title: "New Title",
    author: Date.now()
  };

  await request.post("/post").send(newPostInput);
  await request.post("/post").send(newPostInput);

  const res = await request.get("/post");

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toEqual(2);
});

test("POST /post - should return 400 for invalid text input", async () => {
  const invalidPostInput = {
    text: 123, // Invalid type
    title: "New Title",
    author: Date.now()
  };

  const res = await request.post("/post").send(invalidPostInput);

  expect(res.statusCode).toBe(400);
  expect(res.text).toContain("Bad PUT call to");
});

test("POST /post - should return 400 for invalid title input", async () => {
  const invalidPostInput = {
    text: "New Post",
    title: 123, // Invalid type
    author: Date.now()
  };

  const res = await request.post("/post").send(invalidPostInput);

  expect(res.statusCode).toBe(400);
  expect(res.text).toContain("Bad PUT call to");
});


test("DELETE /post/reset - should delete all posts", async () => {
  const newPostInput = {
    text: "New Post",
    title: "New Title",
    author: Date.now()
  };

  await request.post("/post").send(newPostInput);
  const getPostRes = await request.get("/post");
  expect(getPostRes.body.length).toEqual(1);

  const deletePostRes = await request.delete("/post/reset");
  expect(deletePostRes.statusCode).toBe(200);

  const getPostRes2 = await request.get("/post");
  expect(getPostRes2.body.length).toEqual(0);
});