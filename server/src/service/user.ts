import { User } from "../model/user";
export class UserService {
  private user: User = {} as User;

  users: User[] = [];

  async createUser(email: string, password: string, username: string) {
    const user = {
      id: Date.now(),
      email: email,
      password: password,
      username: username,
    };

    this.users.push(user);
    return user;
  }

  async getUser() {
    return this.user;
  }

  async findUser(usr: string, pass?: string): Promise<User | undefined> {
    if (!pass) {
      return this.users.find((user) => user.username === usr);
    }
    return this.users.find(
      (user) => user.username === usr && user.password === pass
    );
  }
}
