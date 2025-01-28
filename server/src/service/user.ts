import { User } from "../model/user";

export class userService {

    private users : User[] = [];

    async signIn(): Promise<User[]> {
        return this.users;
    }


}