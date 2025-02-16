import axios from 'axios';

axios.defaults.withCredentials = true

export type post = {
    id: number;
    text: string;
    author: number;
    title: string;
}

const BASE_URL = "http://localhost:8080"

export async function getPosts(): Promise<post> {
    const response = await axios.get<post>(`${BASE_URL}/post`)
    return response.data
    
}