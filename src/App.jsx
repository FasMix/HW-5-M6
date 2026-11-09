import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout/Layout"
import { Posts } from "./pages/Posts/Posts"
import { PostDetails } from "./pages/PostDetails/PostDetails"
import { UserDetails } from "./pages/UserDetails/UserDetails"
import Favorites from "./pages/Favorites/Favorites"
import "./App.css"

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  )
}

export default App