import { useNavigate } from "react-router-dom"

function Register() {
  const navigate = useNavigate()
  const handleRegister = () => {
    const user = {
      id: Date.now().toString(),
      email: "123",
      password: "1234",
      name: "Ivan",
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
        alert("bad")
      })
  }
  return (
    <div>
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Register
