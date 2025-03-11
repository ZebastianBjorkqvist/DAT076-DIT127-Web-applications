import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {createPost, Post } from "./api"; 

const mock = new MockAdapter(axios);
const BASE_URL = "http://localhost:8080";

describe("API-calls createPost-function", () => {
    beforeEach(() => {
        mock.reset();
    });

    test("createPost should return a created post", async () => {
        const newPost: Post = { id: 3, text: "New Post", author: "author", title: "New Title", topics:["sports"] };

        mock.onPost(`${BASE_URL}/post`).reply(201, newPost);

        const result = await createPost("New Title", "New Post", ["sports"]);
        expect(result).toEqual(newPost);
    });

    test("should return error message when invalid author type", async () => {
        mock.onPost(`${BASE_URL}/post`).reply(400, "Bad POST call to /post --- author must be a of type number");

        const result = await createPost("Test Title", "This is a test post", []);

        expect(result).toEqual("Bad POST call to /post --- author must be a of type number");
    });

    test("should return error message when API returns 500 (server error)", async () => {
        mock.onPost(`${BASE_URL}/post`).reply(500, "Internal Server Error");

        const result = await createPost("Test Title", "This is a test post", []);

        expect(result).toEqual("Internal Server Error");
    });
});