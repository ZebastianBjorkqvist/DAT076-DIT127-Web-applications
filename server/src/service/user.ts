import { User } from "../model/user";

export class UserService {
  private user: User = {} as User;

  async createUser(
    email: string,
    password: string,
    username: string
  ) {
    const user = {
      id: Date.now(),
      email: email,
      password: password,
      username: username,
    };

    this.user = user;
    return user;
  }

  async getUser() {
    return this.user;
  }
}
