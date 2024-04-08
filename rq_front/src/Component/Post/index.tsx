import { useState } from "react"
import { loadPosts } from "../../queries/postQueries";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { generateUrl } from "../../functions/urlGenerator";

export type Post = {
    userId: number,
    id: number,
    title: string,
    body: string
};

export default function Post() {

    const [page, setPage] = useState(1);  
    const handlePrevPage = () => {
        if(page > 1) {
            setPage(page => page - 1);
        }
    };
    const handleNextPage = () => {
        setPage(page => page + 1);
    }


    const {data: posts, isFetching} = useQuery({
        queryKey: ['post_index', page], 
        queryFn: () => loadPosts(page, 5),
        placeholderData: keepPreviousData,
        initialData: [],
    });

 
    return (
        <div>
            <h1>Posts</h1>
            {
                isFetching && <div>Loading...</div>
            }
            <table style={{margin: '20px 0'}}>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody style={{opacity: isFetching ? 0.3: 1}}>
                    {
                        posts.map(post => (
                            <tr key={post.id}>
                                <td style={{padding: '5px 15px'}}>{post.id}</td>
                                <td style={{padding: '5px 15px'}}>{post.title}</td>
                                <td style={{padding: '5px 15px'}}>
                                    <NavLink to={generateUrl('post_show', {id: post.id})}>
                                        Voir
                                    </NavLink>
                                    <span> / </span>
                                    <NavLink to={generateUrl('post_update', {id: post.id})}>
                                        Modifier
                                    </NavLink>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div>
                <button type="button" onClick={handlePrevPage}>{'<<<'}</button>
                {page}
                <button type="button" onClick={handleNextPage}>{'>>>'}</button>
            </div>
        </div>
    )
}