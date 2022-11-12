import {
  useNavigate,
  useLoaderData,
} from "react-router-dom"
import Note from "./Note"

export const loader = async () => {
  const { id } = JSON.parse(localStorage.getItem("user"))
  const notes = await fetch(
    `http://localhost:5000/notes?userId=${id}&_sort=registrationDate&_order=DESC`
  ).then((r) => r.json())
  return { notes }
}

function Notes() {
  const navigate = useNavigate()
  const { notes } = useLoaderData()
  const goToCreateNote = () => {
    navigate(`/notes/createNote`)
  }

  return (
    <div className="flex flex-col items-center mt-5">
      <p className="text-4xl mt-3 ">Notes</p>
      <button
        className="text-2xl mt-14 rounded	 bg-slate-400 hover:bg-cyan-600 p-2"
        onClick={goToCreateNote}
      >
        Add New Note
      </button>
      <div className="flex flex-col items-center w-1">
        {notes.map((note) => (
          <Note
            items={note}
            noteId={note.noteId}
            key={note.id}
          ></Note>
        ))}
      </div>
    </div>
  )
}

export default Notes
