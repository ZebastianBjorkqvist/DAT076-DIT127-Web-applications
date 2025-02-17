import * as SuperTest from "supertest";
import { app } from "../start";

const request = SuperTest.default(app);

test("Post /user - should create a user", async () => {
  const testUserInput = {
    email: "test.user@gmail.com",
    password: "testpass",
    username: "testusername",
  };
  const response = await request.post("/user").send(testUserInput);

  expect(response.statusCode).toBe(201);

  expect(response.body.email).toEqual(testUserInput.email);
  expect(response.body.password).toEqual(testUserInput.password);
  expect(response.body.password).toEqual(testUserInput.password);
  expect(response.body.username).toEqual(testUserInput.username);
  expect(response.body.id).toEqual(expect.any(Number));
});

test("Post /user - should return the current user", async () => {
  const res = await request.get("/user");
  expect(res.statusCode).toBe(201);
});
