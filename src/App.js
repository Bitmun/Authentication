import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Login from "./routes/Login"
import Home from "./routes/Home"
import Layout from "./routes/Layout"
// import { loader1 as noteLoader } from "./routes/Note"
import Notes, {
  loader as notesLoader,
} from "./routes/Notes"
import ChangeNote, {
  loader as noteLoader,
} from "./routes/ChangeNote"
import CreateNote from "./routes/CreateNote"

import Register from "./routes/Register"
import UserContextProvider from "./components/userContext"
import { ProtectedRoute } from "./components/ProtectedRoute"
import NoteInfo from "./routes/NoteInfo"

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
        path: "/notes",
        element: <Notes />,
        loader: notesLoader,
      },
      {
        path: "/notes/createNote",
        element: <CreateNote></CreateNote>,
      },
      {
        path: "/notes/changeNote/:noteId",
        element: <ChangeNote></ChangeNote>,
        loader: noteLoader,
      },
      {
        path: "/notes/noteInfo/:noteId",
        element: <NoteInfo></NoteInfo>,
        loader: noteLoader,
      },
      {
        path: "*",
        element: (
          <div>
            <div>Not found</div>
            <button>Press Home to go Home</button>
          </div>
        ),
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
