import { useEffect, useState } from "react";
import { addToDo, getAllToDo } from "../../utils/HandleApi";
import Navbar from "../../Components/Navbar/Navbar"
function Notes() {
  const [toDo, setToDo] = useState([])
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [linkcourse, setLinkCourse] = useState("")
  const [lnknotes, setLnkNotes] = useState("")

  useEffect(() => {
    getAllToDo(setToDo)
  }, [])

  return (
    <div>
      < Navbar />


      <div className="container">



        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white">Contribute your Notes</h1>

          <div className="top">
            <input
              type="text"
              placeholder="Name of Notes..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description of Notes..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <input
              type="text"
              placeholder="Link to the Course"
              value={linkcourse}
              onChange={(e) => setLinkCourse(e.target.value)}
            />
            <input
              type="text"
              placeholder="Link to Notes..."
              value={lnknotes}
              onChange={(e) => setLnkNotes(e.target.value)}
            />

            <div
              className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
              onClick={() => addToDo(name, desc, linkcourse, lnknotes, setToDo, setName, setDesc, setLinkCourse, setLnkNotes)}>
              Save
            </div>
          </div>
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">

            <h2 className="text-2xl font-bold text-white">Collections</h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {toDo.map((callout) => (
                <div key={callout.name} className="group relative">
                  <h3 className="mt-6 text-sm text-white">
                    <a target="_blank" rel="noreferrer noopener"  href={callout.lnknotes} >
                      <span className="absolute inset-0" />
                      {callout.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-white">{callout.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Notes