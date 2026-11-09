import { createContext, useContext, useState } from "react"

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])

    const addFavorite = (post) => {
        const exists = favorites.find(item => item.id === post.id)

        if (!exists) {
            setFavorites([...favorites, post])
        }
    }

    const removeFavorite = (id) => {
        setFavorites(favorites.filter(item => item.id !== id))
    }

    const clearFavorites = () => {
        setFavorites([])
    }

    return (
    <FavoritesContext.Provider
        value={{
            favorites,
            addFavorite,
            removeFavorite,
            clearFavorites
        }}
    >
        {children}
    </FavoritesContext.Provider>
    )
}

export const useFavorites = () => useContext(FavoritesContext)