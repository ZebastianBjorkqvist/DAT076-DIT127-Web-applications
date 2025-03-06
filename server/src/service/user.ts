import { where } from "sequelize";
import { sequelize } from "../db/conn";
import { PostModel } from "../db/post.db";
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
      numbr_of_posts: 0
    };

    const newUser = await UserModel.create(user);

    return newUser;
  }

  async getNumbrOfPosts(username: string): Promise<number>{
    const numbr_of_posts = await PostModel.count({where: {author: username}});
    return numbr_of_posts;
  }

  async getNumbrOfLikes(username: string): Promise<number>{
    const posts = await PostModel.findAll({where: {author: username}});
    if(posts.length > 0){
      let likes: number = 0;
      posts.forEach((post) => {
        likes += post.likedBy.length;
      });
      return likes;
    }
    return 0;
  }

  async findUser(usr: string, pass?: string): Promise<User | undefined> {
    const user_response = await UserModel.findOne({ where: {username: usr}});
    if(!user_response){
      return undefined
    }
    const numbr_of_posts = await this.getNumbrOfPosts(user_response.username);
    
    const numbr_of_likes = await this.getNumbrOfLikes(user_response.username);

    const user = { ...user_response.toJSON(), numbr_of_posts , numbr_of_likes};

    if (!pass) {
      return user;
    }
    return await bcrypt.compare(pass, user_response.password) ? user : undefined;
  }
}
