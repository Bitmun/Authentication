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

function ChangeNotes() {
  const { note1 } = useLoaderData()
  const navigate = useNavigate()
  let [title, setTitle] = useState(note1[0].title)
  let [text, setText] = useState(note1[0].text)
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChangeText = (e) => {
    setText(e.target.value)
  }

  function isBlank(str) {
    return !str || /^\s*$/.test(str)
  }

  const goBack = () => {
    navigate("/notes")
  }
  const deleteNote = async () => {
    await fetch(
      `http://localhost:5000/notes/${note1[0].id}`,
      {
        method: "DELETE",
      }
    )
  }

  const handleNote = async () => {
    if (isBlank(title)) {
      title = "Title"
    }
    if (isBlank(text)) {
      text = "Empty note"
    }
    const note = {
      userId: note1[0].userId,
      id: note1[0].id,
      registrationDate: note1[0].registrationDate,
      title: title,
      text: text,
    }

    deleteNote().then(() => {
      fetch(`http://localhost:5000/notes`, {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          navigate("/notes")
        })
        .catch(() => {
          alert("bad")
        })
    })
  }
  return (
    <div className="flex flex-col items-center mt-5">
      <p className="text-4xl mt-3 ">Edit note</p>
      <div className="mt-5 w-5/12">
        <div className="flex flex-col items-center mt-5">
          <input
            className="border 5px rounded p-1  w-full"
            id="title"
            value={title}
            onChange={handleChangeTitle}
          ></input>
          <textarea
            type="text"
            id="mainText"
            className="border 5px rounded p-1 w-full mt-5  h-60"
            rows="30"
            value={text}
            onChange={handleChangeText}
          ></textarea>
          <div className=" w-full flex-row ">
            <button
              onClick={handleNote}
              className="mt-5 border 5px rounded p-1 hover:bg-cyan-600 bg-slate-400 "
            >
              Change
            </button>
            <button
              className="mt-5 border 5px rounded p-1 hover:bg-red-400 bg-slate-400 ml-5"
              onClick={goBack}
            >
              Dont save and exit
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 "></div>
    </div>
  )
}

export default ChangeNotes
