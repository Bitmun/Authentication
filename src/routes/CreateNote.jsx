import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../components/userContext"

function Notes() {
  const navigate = useNavigate()
  const { user } = useUserContext()
  let [title, setTitle] = useState("")
  let [text, setText] = useState("")

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChangeText = (e) => {
    setText(e.target.value)
  }

  function isBlank(str) {
    return !str || /^\s*$/.test(str)
  }

  const handleNote = () => {
    const today = new Date()
    var now = today.toLocaleString()
    if (isBlank(title)) {
      title = "Title"
    }
    if (isBlank(text)) {
      text = "Empty note"
    }

    const note = {
      userId: user.id,
      id: Date.now().toString(),
      registrationDate: now,
      title: title,
      text: text,
    }
    fetch("http://localhost:5000/notes", {
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
  }
  return (
    <div className="flex flex-col items-center mt-5">
      <p className="text-4xl mt-3 ">Note creation</p>
      <div className="mt-5 w-5/12">
        <div className="flex flex-col items-center mt-5">
          <input
            className="border 5px rounded p-1  w-full"
            id="title"
            value={title}
            onChange={handleChangeTitle}
            placeholder="Some title..."
          ></input>
          <textarea
            type="text"
            id="mainText"
            placeholder="Some text..."
            className="border 5px rounded p-1 w-full mt-5  h-60"
            rows="30"
            value={text}
            onChange={handleChangeText}
          ></textarea>
          <button
            onClick={handleNote}
            className="mt-5 border 5px rounded p-1 hover:bg-cyan-600 bg-slate-400 "
          >
            Create
          </button>
        </div>
      </div>
      <div className="mt-10 "></div>
    </div>
  )
}

export default Notes
