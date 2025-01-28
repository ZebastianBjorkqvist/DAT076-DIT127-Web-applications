import { UserService } from "./user"

test("If a user is added, it should exist", async () => {
    const userService = new UserService();
    const user = await userService.createUser("firstName", "lastName", "email", "password");
    const response = await userService.getUser();
    expect(user.firstName == response.firstName).toBeTruthy();
})
