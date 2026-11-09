import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { getPosts, getUsers } from "../../api/api"
import { useFavorites } from "../../context/FavoritesContext"

export const Posts = () => {
    const { addFavorite, removeFavorite, favorites } = useFavorites()

    const {
        data: posts,
        isLoading: postsLoading,
        isError: postsError
    } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        staleTime: 5 * 60 * 1000
    })

    const {
        data: users,
        isLoading: usersLoading,
        isError: usersError
    } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        staleTime: 5 * 60 * 1000
    })

    if (postsLoading || usersLoading) {
        return <h2>Загрузка...</h2>
    }

    if (postsError || usersError || !posts || !users) {
        return <h2>Ошибка загрузки данных</h2>
    }

    return (
        <section>
            <h1>Все посты</h1>

            {posts.map(post => {
                const author = users.find(
                    user => user.id === post.userId
                )

                const isFavorite = favorites.some(
                    item => item.id === post.id
                )

                return (
                    <div key={post.id}>
                        <h3>
                            <Link to={`/posts/${post.id}`}>
                                {post.title}
                            </Link>
                        </h3>

                        <p>
                            Автор: {author?.name}
                        </p>

                        <button
                            onClick={() =>
                                isFavorite
                                    ? removeFavorite(post.id)
                                    : addFavorite(post)
                            }
                        >
                            {isFavorite
                                ? 'Удалить из избранного'
                                : 'В избранное'
                            }
                        </button>

                        <hr />
                    </div>
                )
            })}
        </section>
    )
}