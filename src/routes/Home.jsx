function Home() {
  const user = JSON.parse(localStorage.getItem("user"))
  return <div>Hello, {user.email}</div>
}

export default Home
