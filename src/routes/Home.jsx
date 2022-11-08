import { useUserContext } from "../components/userContext"

function Home() {
  const user = useUserContext()
  return <div>Hello, {user.email}!</div>
}

export default Home
