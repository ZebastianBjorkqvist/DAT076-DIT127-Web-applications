import * as SuperTest from "supertest";
import { app } from "../start";
const request = SuperTest.default(app);

test("Post /user - should return the current user", async () => {
    const res = await request.post("/user");

    expect(res.statusCode).toBe(201);
});