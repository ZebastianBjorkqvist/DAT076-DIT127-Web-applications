import { initDB } from "../db/conn";
import { PostService } from "./post";

describe("PostService", () => {
  let postService: PostService;
  let mockUser: string;

  beforeAll(async () => {
    await initDB();
  });

  beforeEach(async () => {
    postService = new PostService();
    mockUser = "user";
    postService.deleteAllPosts();
  });

  test("If a post is added to the database then it should be in the database", async () => {
    const text = "Test text";
    const author = mockUser;
    const title = "Test title";
    const topics = ["topic1", "topic2"];
    await postService.createPost(text, author, title, topics);
    const posts = await postService.getPosts();
    expect(
      posts.some(
        (p) => p.text === text && p.title === title && p.author === mockUser
      )
    ).toBeTruthy();
  });

  test("should handle multiple posts correctly", async () => {
    await postService.createPost("First", mockUser, "Title1", [
      "topic1",
      "topic2",
    ]);
    await postService.createPost("Second", mockUser, "Title2", [
      "topic1",
      "topic2",
    ]);

    const posts = await postService.getPosts();

    expect(posts.length).toBe(2);
    expect(posts.some((post) => post.text === "First")).toBeTruthy;
    expect(posts.some((post) => post.text === "Second")).toBeTruthy;
  });

  test("should not modify the original post in the posts array", async () => {
    const post = await postService.createPost(
      "Immutable check",
      mockUser,
      "Immutability",
      ["topic1", "topic2"]
    );

    if (post) {
      post.text = "Modified text";
    }

    const posts = await postService.getPosts();
    expect(posts[0].text).toBe("Immutable check");
  });
});
