import { useNavigate } from "react-router-dom"

import image from "./delete_icon.png"
import image1 from "./edit_icon.png"

function Note(props) {
  const navigate = useNavigate()

  const goToChangeNote = () => {
    navigate(`/notes/changeNote/${props.items.id}`)
  }

  const goToNote = () => {
    navigate(`/notes/noteInfo/${props.items.id}`)
  }

  const deleteNote = async () => {
    await fetch(
      `http://localhost:5000/notes/${props.items.id}`,
      {
        method: "DELETE",
      }
    ).then(() => {
      navigate("/notes")
    })
  }
  return (
    <div>
      <div className=" grid  grid-cols-[4fr_1fr_1fr] items-center mt-5  border-2 w-96  break-all px-5 pt-1 pb-1">
        <div>
          <div
            className="mr-6 text-center text-2xl  font-bold hover:underline"
            onClick={goToNote}
          >
            {props.items.title}
          </div>
          <div className=" text-sm" onClick={goToNote}>
            Created at: {props.items.registrationDate}
          </div>
        </div>

        <button
          className="font-light text-red-300 hover:text-red-500 mr-3"
          onClick={deleteNote}
        >
          <img src={image}></img>
        </button>
        <button
          className="font-light text-blue-300 hover:text-blue-500  ml-3"
          onClick={goToChangeNote}
        >
          <img src={image1}></img>
        </button>
      </div>
    </div>
  )
}

export default Note
