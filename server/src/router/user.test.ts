import request from "supertest";
import { app } from "../start"; // Import your Express app
import bcrypt from "bcrypt";
import { initDB } from "../db/conn";

describe("POST /user", () => {
  beforeAll(async () => {
    await initDB();
  });

  beforeEach(async () => {
    // Reset the database using the /user/reset endpoint
    await request(app).delete("/user/reset");
  });

  it("should create a user with valid input", async () => {
    const testUserInput = {
      email: "test.user@gmail.com",
      password: "testpass",
      username: "testusername",
    };

    const response = await request(app).post("/user").send(testUserInput);

    // Assert the response
    expect(response.statusCode).toBe(201);
    expect(response.body.email).toEqual(testUserInput.email);
    expect(response.body.username).toEqual(testUserInput.username);
    expect(response.body.id).toEqual(expect.any(Number));

    // Verify the password is hashed correctly
    const isPasswordValid = bcrypt.compareSync(
      testUserInput.password,
      response.body.password
    );
    expect(isPasswordValid).toBe(true);
  });

  it("should return 409 if username already exists", async () => {
    // Create a user with the same username
    const testUserInput = {
      email: "test.user@gmail.com",
      password: "testpass",
      username: "testusername",
    };
    await request(app).post("/user").send(testUserInput);

    // Attempt to create another user with the same username
    const duplicateUserInput = {
      email: "another.user@gmail.com",
      password: "anotherpass",
      username: "testusername", // Duplicate username
    };

    const response = await request(app).post("/user").send(duplicateUserInput);

    // Assert the response
    expect(response.statusCode).toBe(409);
    expect(response.text).toContain("Username already exists");
  });

  it("should return 400 if email is invalid", async () => {
    const testUserInput = {
      email: "invalid-email", // Invalid email format
      password: "testpass",
      username: "testusername",
    };

    const response = await request(app).post("/user").send(testUserInput);

    // Assert the response
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain("Invalid email format");
  });

  it("should return 400 if password is too short", async () => {
    const testUserInput = {
      email: "test.user@gmail.com",
      password: "s", // Password too short
      username: "testusername",
    };

    const response = await request(app).post("/user").send(testUserInput);

    // Assert the response
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain(
      "Password must be at least 2 characters long"
    );
  });

  it("should return 400 if username is too short", async () => {
    const testUserInput = {
      email: "test.user@gmail.com",
      password: "testpass",
      username: "a", // Username too short
    };

    const response = await request(app).post("/user").send(testUserInput);

    // Assert the response
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain(
      "Username must be at least 2 characters long"
    );
  });
});
