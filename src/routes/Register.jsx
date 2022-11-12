import { useNavigate } from "react-router-dom"
import { useCallback, useState } from "react"
import "../main.css"

function Register() {
  const navigate = useNavigate()
  const goToLogin = () => {
    navigate("/login")
  }
  const [email, setEmail] = useState("")
  const handleSetEmail = useCallback((e) => {
    setEmail(
      e.target.value
        .replace(/\s+/g, " ")
        .replace(/^\s/, "")
        .replace(/\s$/, "")
    )
    const el = document.getElementById("email-button")
    el.classList.remove("notValid")
  }, [])
  const [password, setPassword] = useState("")
  const handleSetPassword = useCallback((e) => {
    setPassword(e.target.value)
    const el = document.getElementById("password-button")
    el.classList.remove("notValid")
  }, [])
  const [confirmPassword, setConfirmPassword] = useState("")
  const handleSetConfirmPassword = useCallback((e) => {
    setConfirmPassword(e.target.value)
    const el = document.getElementById(
      "conf-password-button"
    )
    el.classList.remove("notValid")
  }, [])

  const handleRegister = async () => {
    const response = await fetch(
      `http://localhost:5000/users?email=${email}`
    )
    const users = await response.json()
    if (
      users.length === 0 &&
      confirmPassword === password &&
      email.length != 0 &&
      password.length != 0
    ) {
      const today = new Date()
      var now = today.toLocaleString()
      const user = {
        id: Date.now().toString(),
        email: email,
        password: password,
        registrationDate: now,
      }

      fetch("http://localhost:5000/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          navigate("/login")
        })
        .catch(() => {
          const el = document.getElementById("error")
          el.classList.add("errorOn")
        })
    }

    if (users.length != 0) {
      const el = document.getElementById("email-button")
      el.classList.add("notValid")
    }
    if (password.length == 0) {
      const el = document.getElementById("password-button")
      el.classList.add("notValid")
    }
    if (
      confirmPassword != password ||
      confirmPassword.length == 0
    ) {
      const el = document.getElementById(
        "conf-password-button"
      )
      el.classList.add("notValid")
    }
  }
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
          className="border 5px rounded p-1"
          type="password"
          placeholder="password"
          onChange={handleSetPassword}
          value={password}
          id="password-button"
        ></input>
        <input
          type="password"
          className="border 5px rounded p-1"
          placeholder="confirm password"
          onChange={handleSetConfirmPassword}
          value={confirmPassword}
          id="conf-password-button"
        ></input>
      </div>
      <div>
        <button
          onClick={handleRegister}
          className="mt-4 p-2 rounded	 bg-slate-400 hover:bg-cyan-600"
        >
          Register
        </button>
      </div>
      <button
        onClick={goToLogin}
        className="mt-3 hover:text-blue-300"
      >
        Back to login
      </button>
    </div>
  )
}

export default Register
