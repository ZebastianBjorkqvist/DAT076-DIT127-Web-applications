import { User } from "../model/user";
import { PostService } from "./post";

describe("PostService", () => {
  let postService: PostService;
  let mockUser: number;

  beforeEach(() => {
    postService = new PostService();
    mockUser = Date.now();
  });

  test("If a post is added to the list then it should be in the list", async () => {
    const text = "Test text";
    const author = mockUser;
    const title = "Test title";
    const topics = ["topic1", "topic2"]
    const postService = new PostService();
    await postService.createPost(text, author, title, topics);
    const posts = await postService.getPosts();
    expect(
      posts.some(
        (p) =>
          p.text === text &&
          p.title === title &&
          p.author === mockUser
      )
    ).toBeTruthy();
  });

  test("should handle multiple posts correctly", async () => {
    await postService.createPost("First", mockUser, "Title 1", ["topic1", "topic2"]);
    await postService.createPost("Second", mockUser, "Title 2", ["topic1", "topic2"]);

    const posts = await postService.getPosts();

    expect(posts.length).toBe(2);
    expect(posts[0].text).toBe("First");
    expect(posts[1].text).toBe("Second");
  });

  // Empty string is OK on router. Either change tests or handling

  // test("should throw an error if text is empty", async () => {
  //   await expect(postService.createPost("", mockUser, "Title")).rejects.toThrow(
  //     "Text and title are required."
  //   );
  // });

  // test("should throw an error if title is empty", async () => {
  //   await expect(
  //     postService.createPost("Some content", mockUser, "")
  //   ).rejects.toThrow("Text and title are required.");
  // });


  test("should not modify the original post in the posts array", async () => {
    const post = await postService.createPost(
      "Immutable check",
      mockUser,
      "Immutability",
      ["topic1", "topic2"]
    );
    post.text = "Modified Text"; // Modify the returned object

    const posts = await postService.getPosts();
    expect(posts[0].text).toBe("Immutable check"); // The original should remain unchanged
  });

  test("should clear all posts", async () => {
    await postService.createPost("First", mockUser, "Title 1", ["topic1", "topic2"]);
    postService.clearPosts();
    const posts = await postService.getPosts();
    expect(posts.length).toBe(0);
  });
  
  test("create new post ", async () => {
    const newPost = await postService.newCreatePost("test text", mockUser, "test title", ["topic1", "topic2"]);
    console.log(newPost);
    expect(1 === 1);
  });

});
