import { useParams } from "react-router";
import { showPost, updatePost } from "../../queries/postQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostData, PostForm } from "./PostForm";

export default function Update() {
    const {id} = useParams();
    if(!id) {
        throw new Error('no id is defined');
    }
    const queryClient = useQueryClient();

    const {data: post, isLoading, error} = useQuery({
        enabled: id !== undefined,
        queryKey: ['post_show', id],
        queryFn: () => showPost(id),
        gcTime: 0,
        initialData: null
    });

    const {mutate, isPending: isUpdating, isSuccess, reset} = useMutation({
        mutationKey: ['post_update', id],
        mutationFn: async (formData: PostData) => {
            updatePost(id, formData);
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['post_index']})
    })

    if(isLoading) {
        return <div>loading...</div>
    } else if(error || !post) {
        return <div>erreur</div>
    }

    return (
        <>
            {
                isUpdating && <div>updating...</div>
            }
            {
                isSuccess && (
                    <div>
                        <span>Félicitations ! post mis à jour !</span>
                        <button onClick={reset}>Fermer</button>
                    </div>
                )
            }
            <PostForm 
                post={post}
                onSubmit={mutate}
            />
        </>
    )

}