import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import Login from "./routes/Login"
import Home from "./routes/Home"
import Layout from "./routes/Layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: () => {
      const user = localStorage.getItem("user")
      if (!user) {
        return redirect("login")
      }
    },
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "*",
        element: <div>Not found</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
