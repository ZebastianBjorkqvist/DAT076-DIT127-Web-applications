import * as SuperTest from "supertest";
import { app } from "../start";
import bcrypt from "bcrypt";


const request = SuperTest.default(app);
const salt = bcrypt.genSaltSync(10);


test("Post /user - should create a user", async () => {
  const testUserInput = {
    email: "test.user@gmail.com",
    password: "testpass",
    username: "testusername",
  };
  const response = await request.post("/user").send(testUserInput);

  expect(response.statusCode).toBe(201);

  expect(response.body.email).toEqual(testUserInput.email);
  const isPasswordValid = bcrypt.compareSync(testUserInput.password, response.body.password);
  expect(isPasswordValid).toBe(true);
  expect(response.body.username).toEqual(testUserInput.username);
  expect(response.body.id).toEqual(expect.any(Number));
});


