import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./routes/Login"
import Home from "./routes/Home"
import Layout from "./routes/Layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <div>Not found</div>,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
