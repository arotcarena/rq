import { useQuery, useQueryClient } from "@tanstack/react-query"
import { loadPosts } from "../../queries/postQueries";
import { Post } from "../Post";

export default function Contact() {

    // const {data: posts, isFetching} = useQuery({
    //     queryKey: ['post_index', 1],
    //     queryFn: () => loadPosts(1, 5),
    //     initialData: []
    // });
    
    
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<Post[]>(['post_index', 1]);
    const posts = data || [];

    return (
        <>
            <h1>Contact</h1>
            <ul>
                {
                    posts.map(post => (
                        <li key={post.id}>#{post.id} {post.title}</li>
                    ))
                }
            </ul>
        </>
    )
}