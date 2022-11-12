import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from "../components/userContext"
import "../main.css"

function Login() {
  const userContext = useUserContext()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const handleSetEmail = useCallback((e) => {
    setEmail(
      e.target.value
        .replace(/\s+/g, " ")
        .replace(/^\s/, "")
        .replace(/\s$/, "")
    )
  }, [])
  const [password, setPassword] = useState("")
  const handleSetPassword = useCallback(
    (e) => setPassword(e.target.value),
    []
  )

  const handleLogin = useCallback(() => {
    fetch(
      `http://localhost:5000/users?email=${email}&password=${password}`
    )
      .then((r) => r.json())
      .then((users) => {
        if (users.length === 1) {
          userContext.setUser(users[0])
        } else {
          const el = document.getElementById("error")
          el.classList.add("errorOn")
        }
      })
  }, [email, password, userContext])

  useEffect(() => {
    if (userContext.user?.email) {
      navigate("/")
    }
  }, [navigate, userContext.user])
  return (
    <div className="p-2 flex flex-col items-center mt-5">
      <div className=" flex flex-col items-center gap-2">
        <input
          type="email"
          className="border 5px rounded p-1"
          placeholder="email"
          onChange={handleSetEmail}
          value={email}
          id="email-button"
        ></input>

        <input
          type="password"
          className="border 5px rounded p-1"
          placeholder=" password"
          onChange={handleSetPassword}
          value={password}
        ></input>
        <button
          onClick={handleLogin}
          className="mt-4 p-2 rounded	 bg-slate-400 hover:bg-cyan-600"
        >
          Log in
        </button>
        <Link
          to="/register"
          className=" hover:text-red-500"
        >
          Don't have an accout?
        </Link>
        <div className="error" id="error">
          Not valid email or password
        </div>
      </div>
    </div>
  )
}

export default Login
