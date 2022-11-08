import { useCallback, useState } from "react"
function Login() {
  const [email, setEmail] = useState("")
  const handleSetEmail = useCallback((e) => setEmail(e.target.value), [])
  const [password, setPassword] = useState("")
  const handleSetPassword = useCallback((e) => setPassword(e.target.value), [])

  const handleLogin = useCallback(() => {
    localStorage.setItem("user", JSON.stringify({ email, password }))
  }, [email, password])
  return (
    <div className=" flex flex-col items-center gap-2">
      <input placeholder="email" onChange={handleSetEmail} value={email}></input>

      <input type="password" placeholder="password" onChange={handleSetPassword} value={password}></input>
      <button onClick={handleLogin}>Log in</button>
    </div>
  )
}

export default Login
