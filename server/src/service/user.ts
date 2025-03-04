import { UserModel } from "../db/user.db";
import { User } from "../model/user";
import bcrypt from "bcrypt";
export class UserService {

  async createUser(email: string, password: string, username: string) {
    const salt = bcrypt.genSaltSync(10);
    const user = {
      id: Date.now(),
      email: email,
      password: bcrypt.hashSync(password, salt),
      username: username,
    };

    const newUser = await UserModel.create(user);

    return newUser;
  }

  async findUser(usr: string, pass?: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ where: {username: usr} })
    if(!user){
      return undefined
    }
    if (!pass) {
      return user;
    }
    return await bcrypt.compare(pass, user.password) ? user : undefined;
  }
}
