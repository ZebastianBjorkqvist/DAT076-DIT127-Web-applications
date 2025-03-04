import axios from "axios";

axios.defaults.withCredentials = true;

export type Post = {
  id: number;
  author: string;
  text: string;
  title: string;
  topics: string[];
};

export type User = {
  id: number;
  email: string;
  password: string;
  username: string;
};

export type CurrentUser = {
  username: string;
  email: string;
};

const BASE_URL = "http://localhost:8080";

export async function getPosts(): Promise<Post[]> {
  const response = await axios.get<Post[]>(`${BASE_URL}/post`);
  console.log(response.data);
  return response.data;
}

export async function getPostByTopic(topic: string): Promise<Post[]>{
  try {
    const response = await axios.get<Post[]>(`${BASE_URL}/post?topic=${topic}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Something went wrong fetching the posts: " + error.message);
    }
    return [];
  }
}

export async function createPost(
  title: string,
  text: string,
  topics: string[]
): Promise<Post | string> {
  try {
    const response = await axios.post<Post>(`${BASE_URL}/post`, {
      title: title,
      text: text,
      topics: topics,
    });
    if (response.status !== 201) {
      throw new Error(response.statusText);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || `Error: ${error.message}`;
    }
    return "Something went wrong creating a post";
  }
}

export async function createUser(
  email: string,
  pass: string,
  usr: string
): Promise<User | string> {
  try {
    const response = await axios.post<User>(`${BASE_URL}/user`, {
      email: email,
      password: pass,
      username: usr,
    });
    if (response.status !== 201) {
      throw new Error(response.statusText);
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed creating a user: ", error.message);
      return error.message;
    }
    return "Something went wrong creating a user";
  }
}

export enum LoginResult {
  SUCCESS,
  INVALID_CREDENTIALS,
  SERVER_ERROR,
}

export async function login(
  username: string,
  password: string
): Promise<LoginResult> {
  try {
    await axios.post(`${BASE_URL}/user/login`, {
      username: username,
      password: password,
    });
    return LoginResult.SUCCESS;
  } catch (e: any) {
    if (e.response.status === 401) {
      return LoginResult.INVALID_CREDENTIALS;
    }
    return LoginResult.SERVER_ERROR;
  }
}

export async function checkAuth(): Promise<boolean> {
  try {
    const response = await axios.get(`${BASE_URL}/user/check-auth`, {
      withCredentials: true,
    });
    return response.status === 200;
  } catch (e: any) {
    return false;
  }
}

export async function logout(): Promise<boolean> {
  try {
    const response = await axios.post(`${BASE_URL}/user/logout`);
    return response.status === 200;
  } catch (e: any) {
    return false;
  }
}

export async function getCurrentUser(): Promise<CurrentUser | undefined> {
  try {
    const response = await axios.get<CurrentUser>(`${BASE_URL}/user/current`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data;
  } catch (e: any) {
    console.log("Failed to get current user: ", e.message);
    return undefined;
  }
}

export const fetchLikes = async (postId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/likes`);
    return response.data; // Assuming response contains likeCount and userLiked
  } catch (error) {
    console.error("Error fetching likes:", error);
    throw error;
  }
};

export const updateLike = async (
  postId: string,
  like: boolean,
  token: string
) => {
  try {
    await axios.post(
      `${BASE_URL}/posts/${postId}/like`,
      { like },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error updating like:", error);
    throw error;
  }
};
