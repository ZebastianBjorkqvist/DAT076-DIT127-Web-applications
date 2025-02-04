import { User } from "../model/user";
import { UserService } from "./user";

let userCpy = {} as User;

test("If a user is added, it should exist", async () => {
  const userService = new UserService();
  const user = await userService.createUser(
    "firstName",
    "lastName",
    "email",
    "password",
    "username"
  );
  const response = await userService.getUser();
  userCpy = user;
  expect(user.firstName == response.firstName).toBeTruthy();
});

test("If a new user is created, it should replace the old one", async () => {
  const userService = new UserService();
  await userService.createUser("fname", "lname", "mail", "passwd", "usrnme");
  const response = await userService.getUser();
  expect(userCpy != response).toBeTruthy();
});
