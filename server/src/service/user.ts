import { User } from "../model/user";

export class UserService {
    private user : User = {} as User;

    async createUser(firstName: string, lastName: string, email:string, password:string) {
        const user = {
            id: Date.now(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        }

        this.user = user;
        return user;
    }

    async getUser() {
        return this.user;
    }

}