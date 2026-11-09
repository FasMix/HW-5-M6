import { Link } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'

function Favorites() {
    const {
        favorites,
        removeFavorite,
        clearFavorites
    } = useFavorites()

    return (
        <section>
            <h1>Избранное</h1>
            {favorites.length === 0 ? (
                <h3>Избранных постов пока нет</h3>
            ) : (
                <>
                    <button onClick={clearFavorites}>
                        Очистить избранное
                    </button>
                    {favorites.map(post => (
                        <div key={post.id}>
                            <h3>
                                <Link to={`/posts/${post.id}`}>
                                    {post.title}
                                </Link>
                            </h3>
                            <button
                                onClick={() => removeFavorite(post.id)}
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                </>
            )}
        </section>
    )
}

export default Favorites