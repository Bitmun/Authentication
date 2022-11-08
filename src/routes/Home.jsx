import { useUserContext } from "../components/userContext"

function Home() {
  const { user } = useUserContext()
  return <div>Hello, {user.name}!</div>
}

export default Home
