import { useParams } from "react-router"
import { showPost } from "../../queries/postQueries";
import { useQuery } from "@tanstack/react-query";

export default function Show() {

    const {id} = useParams();
    if(!id) {
        throw new Error('no id is defined');
    }

    const {data: post, isLoading, error} = useQuery({
        enabled: id !== undefined,
        queryKey: ['post_show', id],
        queryFn: () => showPost(id),
        initialData: null
    });

    if(isLoading) {
        return <div>Loading...</div>
    } else if (error || !post) {
        return <div>Une erreur est survenue</div>
    }

    return (
        <>
            <p><strong>#ID : </strong> {post.id}</p>
            <p><strong>title : </strong> {post.title}</p>
            <p><strong>body : </strong> {post.body}</p>
        </>
    )
}