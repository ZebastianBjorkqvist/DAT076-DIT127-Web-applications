import * as SuperTest from "supertest";
import { app } from "../start";
import { initDB } from "../db/conn";

const request = SuperTest.default(app);
let cookie: string[];
let postId: number;

beforeAll(async () => {
  await initDB();

  const testUserInput = {
    email: "test.user@gmail.com",
    password: "testpass",
    username: "testuser",
  };
  await request.post("/user").send(testUserInput);
  const loginData = { username: "testuser", password: "testpass" };
  const res = await request.post("/user/login").send(loginData);
  cookie = res.get("Set-Cookie") as string[];
  expect(cookie).toBeTruthy();
});

beforeEach(async () => {
  const res = await request.delete("/post/reset").set("Cookie", cookie);
  const newPostInput = {
    text: "New Post",
    title: "New Title",
    topics: ["test"],
  };

  const postRes = await request
    .post("/post")
    .set("Cookie", cookie)
    .send(newPostInput);
  postId = postRes.body.id;
  expect(postId).toBeTruthy();
});

test("POST /post - should create a new post", async () => {
  const newPostInput = {
    text: "New Post",
    title: "New Title",
    topics: ["test"],
  };

  const res = await request
    .post("/post")
    .set("Cookie", cookie)
    .send(newPostInput);
  expect(res.statusCode).toBe(201);
  expect(res.body.text).toEqual(newPostInput.text);
  expect(res.body.title).toEqual(newPostInput.title);
  expect(res.body.topics).toEqual(newPostInput.topics);
});

test("GET /post - should return all posts", async () => {
  const newPostInput = {
    text: "all Post",
    title: "all Title",
    topics: ["test"],
  };

  await request.post("/post").set("Cookie", cookie).send(newPostInput);
  await request.post("/post").set("Cookie", cookie).send(newPostInput);

  const res = await request.get("/post").set("Cookie", cookie);
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toEqual(3); //3 because all tests start with one post from beforeEach
});

test("POST /post - should return 400 for invalid text input", async () => {
  const invalidPostInput = {
    text: 123,
    title: "New Title",
    topics: ["test"],
  };

  const res = await request
    .post("/post")
    .set("Cookie", cookie)
    .send(invalidPostInput);

  expect(res.statusCode).toBe(400);
  expect(res.text).toContain("text should be a string");
});

test("POST /post - should return 400 for invalid title input", async () => {
  const invalidPostInput = {
    text: "New Post",
    title: 123,
    topics: ["test"],
  };

  const res = await request
    .post("/post")
    .set("Cookie", cookie)
    .send(invalidPostInput);

  expect(res.statusCode).toBe(400);
  expect(res.text).toContain("title should be a string");
});

test("DELETE /post/reset - should delete all posts", async () => {
  const newPostInput = {
    text: "New Post",
    title: "New Title",
    topics: ["test"],
  };

  await request.post("/post").set("Cookie", cookie).send(newPostInput);
  const getPostRes = await request.get("/post").set("Cookie", cookie);
  expect(getPostRes.body.length).toEqual(2);

  const deletePostRes = await request
    .delete("/post/reset")
    .set("Cookie", cookie);
  expect(deletePostRes.statusCode).toBe(200);

  const getPostRes2 = await request.get("/post").set("Cookie", cookie);
  expect(getPostRes2.body.length).toEqual(0);
});

test("POST /post/:postId/like - should like a post", async () => {
  const res = await request
    .post(`/post/${postId}/like`)
    .set("Cookie", cookie)
    .send({ like: "true" });

  expect(res.statusCode).toBe(200);
  expect(res.text).toBe("Like status updated");
});

test("POST /post/:postId/like - should unlike a post", async () => {
  const res = await request
    .post(`/post/${postId}/like`)
    .set("Cookie", cookie)
    .send({ like: "false" });

  expect(res.statusCode).toBe(200);
  expect(res.text).toBe("Like status updated");
});

test("GET /post/:postId/likes - should return like data", async () => {
  await request
    .post(`/post/${postId}/like`)
    .set("Cookie", cookie)
    .send({ like: "true" });

  const res = await request.get(`/post/${postId}/likes`).set("Cookie", cookie);

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("likeCount");
});

test("POST /post/:postId/like - should return 400 for invalid like value", async () => {
  const res = await request
    .post(`/post/${postId}/like`)
    .set("Cookie", cookie)
    .send({ like: "invalid" });

  expect(res.statusCode).toBe(400);
  expect(res.text).toBe("Invalid like value");
});

test("POST /post/:postId/like - should return 400 for invalid post ID", async () => {
  const res = await request
    .post(`/post/invalid/like`)
    .set("Cookie", cookie)
    .send({ like: "true" });

  expect(res.statusCode).toBe(400);
  expect(res.text).toBe("Invalid post ID");
});
