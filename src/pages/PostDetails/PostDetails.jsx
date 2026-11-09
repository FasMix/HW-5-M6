import { Link, useParams } from "react-router-dom"
import { useFavorites } from "../../context/FavoritesContext"
import { useQuery } from "@tanstack/react-query"
import { getPost, getUser } from "../../api/api"

export const PostDetails = () => {
    const { id } = useParams()

    const { addFavorite, removeFavorite, favorites } = useFavorites()

    const { data: post, isLoading, isError } = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPost(id),
        staleTime: 5 * 60 * 1000
    })

    const { data: user, isLoading: useLoading, isError: useError } = useQuery({
        queryKey: ['user', post?.userId],
        queryFn: () => getUser(post.userId),
        enabled: !!post,
        staleTime: 5 * 60 * 1000
    })

    if (isLoading) {
        return <h2>Загрузка поста...</h2>
    }

    if (isError || !post) {
        return <h2>Ошибка загрузки поста</h2>
    }

    if (useLoading) {
        return <h2>Загрузка автора...</h2>
    }

    if (useError || !user) {
        return <h2>Ошибка загрузки автора</h2>
    }

    const isFavorite = favorites.some(
        item => item.id === post.id
    )

    return (
        <section>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <h3>
                Автор:
                <Link to={`/users/${user.id}`}>
                    {user.name}
                </Link>
            </h3>
            <button onClick={() => isFavorite ? removeFavorite(post.id) : addFavorite(post)}>
                {isFavorite ? 'Удалить из избранного' : 'В избранное'}
            </button>
        </section>
    )
}
