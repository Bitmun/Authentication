import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from "../components/userContext"
function Login() {
  const userContext = useUserContext()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const handleSetEmail = useCallback(
    (e) => setEmail(e.target.value),
    []
  )
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
          alert("User data unvalid")
        }
      })
  }, [email, password, userContext])

  useEffect(() => {
    if (userContext.user?.email) {
      navigate("/")
    }
  }, [navigate, userContext.user])
  return (
    <div className=" flex flex-col items-center gap-2">
      <input
        placeholder="email"
        onChange={handleSetEmail}
        value={email}
      ></input>

      <input
        type="password"
        placeholder="password"
        onChange={handleSetPassword}
        value={password}
      ></input>
      <button onClick={handleLogin}>Log in</button>
      <Link to="/register">Register</Link>
    </div>
  )
}

export default Login
