import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { getPostsByUser, getUser } from "../../api/api"

export const UserDetails = () => {
    const { id } = useParams()

    const { data: user, isLoading: userLoading, isError: userError } = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUser(id),
        staleTime: 5 * 60 * 1000
    })

    const {
        data: posts,
        isLoading: postsLoading,
        isError: postsError
    } = useQuery({
        queryKey: ['userPosts', id],
        queryFn: () => getPostsByUser(id),
        staleTime: 5 * 60 * 1000
    })

    if (userLoading || postsLoading) {
        return <h2>Загрузка...</h2>
    }

    if (userError || postsError || !user || !posts) {
        return <h2>Ошибка загрузки</h2>
    }

    return (
        <section>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Город: {user.address.city}</p>
            <h2>Посты автора</h2>
            {posts.map(post => (
                <div key={post.id}>
                    <h3>
                        <Link to={`/posts/${post.id}`}>
                            {post.title}
                        </Link>
                    </h3>
                </div>
            ))}
        </section>
    )
}
