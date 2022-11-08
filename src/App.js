import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Login from "./routes/Login"
import Home from "./routes/Home"
import Layout from "./routes/Layout"
import Register from "./routes/Register"
import UserContextProvider from "./components/userContext"
import { ProtectedRoute } from "./components/ProtectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
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
  {
    path: "/register",
    element: <Register />,
  },
])

export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  )
}
