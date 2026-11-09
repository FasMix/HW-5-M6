import { Link } from "react-router-dom"
import { useFavorites } from "../../context/FavoritesContext"

export const Header = () => {
    const { favorites } = useFavorites()

    return (
        <header>
            <h2>My Blog</h2>

            <nav>
                <Link to="/posts">Посты</Link>
                <Link to="/favorites">
                    Избранное ({favorites.length})
                </Link>
            </nav>
        </header>
    )
}