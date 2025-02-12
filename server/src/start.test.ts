import * as SuperTest from "supertest";
import { app } from "./start";
import { Post } from "./model/post";
import { User } from "./model/user";
import exp from "constants";

const request = SuperTest.default(app);

test("End-to-end test", async () => {
  const authorObject: User = {
    id: Date.now(),
    firstName: "Test",
    lastName: "User",
    email: "test.user@gmail.com",
    password: "testpass",
    userName: "testuser",
  };

  const testCreatePostInput = {
    text: "This is a test post",
    author: authorObject,
    title: "Test title",
  };

  const createUserResult = await request.post("/user").send(authorObject);
  expect(createUserResult.statusCode).toEqual(201);

  const getUserResult = await request.get("/user");
  expect(getUserResult.statusCode).toEqual(201);
  expect(getUserResult.body.firstName).toEqual(authorObject.firstName);
  expect(getUserResult.body.lastName).toEqual(authorObject.lastName);
  expect(getUserResult.body.email).toEqual(authorObject.email);
  expect(getUserResult.body.password).toEqual(authorObject.password);
  expect(getUserResult.body.userName).toEqual(authorObject.userName);
  

  
  const createPostResult = await request.post("/post").send(testCreatePostInput);
  expect(createPostResult.statusCode).toEqual(201);
  expect(createPostResult.body.text).toEqual(testCreatePostInput.text);
  expect(createPostResult.body.author).toEqual(authorObject);
  expect(createPostResult.body.title).toEqual(testCreatePostInput.title);

  const getPostResult = await request.get("/post");
  expect(getPostResult.statusCode).toEqual(200);
  expect(getPostResult.body.map((post: Post) => post.title)).toContain(
    testCreatePostInput.title
  );
});
