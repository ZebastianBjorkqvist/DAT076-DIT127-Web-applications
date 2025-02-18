import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {createPost, Post } from "./api"; 

const mock = new MockAdapter(axios);
const BASE_URL = "http://localhost:8080";

describe("API Calls", () => {
    beforeEach(() => {
        mock.reset();
    });

    test("createPost should return a created post", async () => {
        const newPost: Post = { id: 3, text: "New Post", author: 123, title: "New Title" };

        mock.onPost(`${BASE_URL}/post`).reply(201, newPost);

        const result = await createPost("New Title", "New Post");
        expect(result).toEqual(newPost);
    });
});