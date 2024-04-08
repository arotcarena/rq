import { Post } from "../Component/Post";
import { PostData } from "../Component/Post/PostForm";
import { customFetch } from "../functions/api/customFetch";

const baseEndpoint = 'https://jsonplaceholder.typicode.com/posts';

export const loadPosts = (page: number = 1, limit: number = 5): Promise<Post[]> => {
    return customFetch(baseEndpoint, {_page: page, _limit: limit}, 'GET');
}

export const showPost = async (id: number|string): Promise<Post> => {
    const posts = await customFetch(baseEndpoint, {id}, 'GET');
    return posts[0];
}

export const createPost = async (post: PostData): Promise<void> => {
    await customFetch(baseEndpoint, post, 'POST');
}

export const updatePost = async (id: number|string, post: PostData): Promise<void> => {
    await customFetch(baseEndpoint + '/' + id, post, 'PUT');
}