import { NavLink, Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div>
      <header className="bg-slate-200 flex gap-1 justify-center mb-5">
        <NavLink to="/" end={true}>
          Home
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
