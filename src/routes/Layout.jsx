import { NavLink, Outlet } from "react-router-dom"
import { useUserContext } from "../components/userContext"

export default function Layout() {
  const user = useUserContext()
  const handleLogOut = () => {
    user.setUser({ email: "" })
  }

  return (
    <div className=" p-2">
      <header className="bg-slate-200 flex gap-3 justify-center mb-5">
        <NavLink to="/" end={true}>
          Home
        </NavLink>

        <button
          onClick={handleLogOut}
          className="text-red-500"
        >
          Log out
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
