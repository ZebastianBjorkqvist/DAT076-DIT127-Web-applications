import * as SuperTest from "supertest";
import { app } from "../start";

const request = SuperTest.default(app);

test("Post /user - should create a user", async () => {
    const testUserInput = {
        firstName: "Test",
        lastName: "User",
        email: "test.user@gmail.com",
        password: "testpass",
        userName: "testusername"
    }
    const response = await request.post("/user").send(testUserInput);

    expect(response.statusCode).toBe(201);
    console.log(response.body);

    expect(response.body.firstName).toEqual(testUserInput.firstName);
    expect(response.body.lastName).toEqual(testUserInput.lastName);
    expect(response.body.email).toEqual(testUserInput.email);
    expect(response.body.password).toEqual(testUserInput.password);
    expect(response.body.password).toEqual(testUserInput.password);
    expect(response.body.userName).toEqual(testUserInput.userName);
    expect(response.body.id).toEqual(expect.any(Number));
    
});


test("Post /user - should return the current user", async () => {
    const res = await request.get("/user");
    console.log(res.body);
    expect(res.statusCode).toBe(201);
});