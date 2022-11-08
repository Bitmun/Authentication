import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
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
    userContext.setUser({ email, password })
    navigate("/")
  }, [email, password, navigate, userContext])
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
    </div>
  )
}

export default Login
