import { initDB } from "../db/conn";
import { UserService } from "./user";

describe("UserService", () => {
  let userService: UserService;
  let mockEmail: string;
  let mockPassword: string;
  let mockUsername: string;

  beforeAll(async () => {
    await initDB();
  });

  beforeEach(async () => {
    userService = new UserService();
    mockEmail = "test.user@gmail.com";
    mockPassword = "testpass";
    mockUsername = "testusername";
    await userService.deleteAllUsers();
  });

  test("If a user is created it should exist in the database", async () => {
    const user = await userService.createUser(
      mockEmail,
      mockPassword,
      mockUsername
    );

    if (user) {
      const foundUser = await userService.findUser(user.username);
      expect(foundUser?.email).toBe(mockEmail);
      expect(foundUser?.username).toBe(mockUsername);
    }
  });

  test("should return the correct number of posts for a user", async () => {
    const user = await userService.createUser(
      mockEmail,
      mockPassword,
      mockUsername
    );

    if (user) {
      const numbrOfPosts = await userService.getNumbrOfPosts(user.username);
      expect(numbrOfPosts).toBe(0);
    }
  });

  test("should return the correct number of likes for a user", async () => {
    const user = await userService.createUser(
      mockEmail,
      mockPassword,
      mockUsername
    );

    if (user) {
      const numbrOfLikes = await userService.getNumbrOfLikes(user.username);
      expect(numbrOfLikes).toBe(0);
    }
  });
});
