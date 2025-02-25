import { User } from "../model/user";
import bcrypt from "bcrypt";
export class UserService {
  private user: User = {} as User;

  users: User[] = [];

  async createUser(email: string, password: string, username: string) {
    const salt = bcrypt.genSaltSync(10);
    const user = {
      id: Date.now(),
      email: email,
      password: bcrypt.hashSync(password, salt),
      username: username,
    };

    this.users.push(user);
    return user;
  }

  async getUser() {
    return this.users;
  }

  async findUser(usr: string, pass?: string): Promise<User | undefined> {
    if (!pass) {
      return this.users.find((user) => user.username === usr);
    }
    return this.users.find(
      (user) => user.username === usr && bcrypt.compare(pass, user.password)
    );
  }
}
