import { UserModel } from "../db/user.db";
import { User } from "../model/user";
import { UserService } from "./user";

let userCpy = {} as UserModel;
const userService = new UserService();

test("If a user is added, it should exist", async () => {
  const user = await userService.createUser("email", "password", "username");
  if (user) {
    const response = await userService.findUser(user.username);
    userCpy = user;
    expect(user.email == response?.email).toBeTruthy();
  }
});

test("If a username excist it should throw an error", async () => {
  await userService.createUser("email", "password", "username");
  await expect(userService.createUser("email", "password", "username")).rejects.toThrow("Username already exists");});
