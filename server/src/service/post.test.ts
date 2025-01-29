import { PostService } from "./post";
import { UserService } from "./user";

test("If a post is added to the list then it should be in the list", async () => {
  const userService = new UserService();

  const user = await userService.createUser(
    "zeb",
    "bjo",
    "test@email.com",
    "testpass",
    "user"
  );
  const text = "Test text";
  const author = user;
  const title = "Test title";
  const postService = new PostService();
  await postService.createPost(text, author, title);
  const posts = await postService.getPosts();
  expect(
    posts.some(
      (post) =>
        post.text === text && post.author === author && post.title === title
    )
  ).toBeTruthy();
});
