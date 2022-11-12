import { useState } from "react"
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom"

export const loader = async ({ params: { noteId } }) => {
  const note1 = await fetch(
    `http://localhost:5000/notes?id=${noteId}`
  ).then((r) => r.json())

  return { note1 }
}

function NoteInfo() {
  const { note1 } = useLoaderData()
  const navigate = useNavigate()
  const [title, setTitle] = useState(note1[0].title)
  const [text, setText] = useState(note1[0].text)
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChangeText = (e) => {
    setText(e.target.value)
  }

  const deleteNote = async () => {
    await fetch(
      `http://localhost:5000/notes/${note1[0].id}`,
      {
        method: "DELETE",
      }
    )
    goBack()
  }

  const goBack = () => {
    navigate("/notes")
  }

  const goToChangeNote = () => {
    navigate(`/notes/changeNote/${note1[0].id}`)
  }

  return (
    <div className="flex flex-col items-center mt-5">
      <button
        onClick={goBack}
        className="text-4xl border 5px rounded p-1 hover:bg-cyan-600 bg-blue-400 "
      >
        Go Back
      </button>
      <p className="text-4xl mt-5">{note1[0].title}</p>
      <div className="mt-5 w-5/12">
        <div className="flex flex-col items-center mt-3">
          <div
            id="mainText"
            className="border 5px rounded-md p-1 w-full mt-5  h-fit"
            value={text}
            onChange={handleChangeText}
          >
            {note1[0].text}
          </div>
          <div className="flex flex-row gap-4">
            <button
              onClick={goToChangeNote}
              className="mt-5 border 5px rounded p-1 hover:bg-slate-500 bg-slate-300 "
            >
              Change
            </button>
            <button
              onClick={deleteNote}
              className="mt-5 border 5px rounded p-1 hover:bg-red-600 bg-red-400 "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 "></div>
    </div>
  )
}

export default NoteInfo
