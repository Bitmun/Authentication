import { useNavigate } from "react-router-dom"
import { useUserContext } from "../components/userContext"

function Home() {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const goToNotes = () => {
    navigate(`/notes`)
  }
  return (
    <div className="  flex flex-col items-center mt-5  ">
      <p className="text-4xl mt-3">
        Hello,
        <span className="font-bold">{user.email}!</span>
      </p>
      <p className="mt-5 text-2xl">
        Registration date:{" "}
        <span className="font-bold">
          {user.registrationDate}
        </span>
      </p>
      <button
        className="mt-5 text-5xl bg-slate-400  rounded-lg p-2 "
        onClick={goToNotes}
      >
        Go to notes
      </button>
    </div>
  )
}

export default Home
