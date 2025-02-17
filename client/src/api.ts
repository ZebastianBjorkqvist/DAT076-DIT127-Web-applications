import axios from 'axios';

axios.defaults.withCredentials = true

export type Post = {
    id: number;
    text: string;
    author: number;
    title: string;
}

export type User = {
    id: number;
    email: string;
    password: string;
    username: string;
}

const BASE_URL = "http://localhost:8080"

export async function getPosts(): Promise<Post[]> {
    const response = await axios.get<Post[]>(`${BASE_URL}/post`)
    return response.data
    
}

export async function createPost(title: string, text: string): Promise<Post | string> {
    try{
        const response = await axios.post<Post>(`${BASE_URL}/post`, {title: title, text: text, author: 123});
        if (response.status !== 201) {
            throw new Error(response.statusText);
        }
        return response.data;
    } catch (error) {
        if(error instanceof Error){
            console.log("Failed creating a post: ", error.message);
            return error.message;
        }
        return "Something went wrong creating a post";
    }
    
}

export async function createUser(email: string, password:string, username:string ): Promise<User | string> {
    try{
        const response = await axios.post<User>(`${BASE_URL}/user`, {email: email, password:password, username:username});
        if (response.status !== 201) {
            throw new Error(response.statusText);
        }
        return response.data;
    } catch (error) {
        if(error instanceof Error){
            console.log("Failed creating a user: ", error.message);
            return error.message;
        }
        return "Something went wrong creating a user";
    }
}