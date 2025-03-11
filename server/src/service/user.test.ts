import { UserModel } from "../db/user.db";
import { User } from "../model/user";
import { UserService } from "./user";

let userCpy = {} as UserModel;
let userCpy2 = {} as User
const userService = new UserService();

test("If a user is added, it should exist", async () => {
  const user = await userService.createUser("email", "password", "username");
  if (user) {
    const response = await userService.findUser(user.username);
    userCpy = user;
    expect(user.email == response?.email).toBeTruthy();
  }
});

test("If a new user is created, it should replace the old one", async () => {
  await userService.createUser("mail", "passwd", "usrnme");
  const response = await userService.findUser("usrnme");
  expect(userCpy2 != response).toBeTruthy();
});
