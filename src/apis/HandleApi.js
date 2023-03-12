import axios from 'axios'

const baseUrl = "https://saarthi.onrender.com/notes"

const getAllToDo = (setToDo) => {
    axios
        .get(`${baseUrl}/get`)
        .then(({ data }) => {
            setToDo(data)
        })
        .catch((err) => console.log(err))
}

const addToDo = (name, desc, linkcourse, lnknotes, setName, setDesc, setLinkCourse, setLnkNotes, setToDo) => {

    axios
        .post(`${baseUrl}/save`, { name, desc, linkcourse, lnknotes })
        .then((data) => {
            setName("");
            setDesc("");
            setLinkCourse("");
            setLnkNotes("");
            getAllToDo(setToDo)
        })
        .catch((err) => console.log(err))

}




export { getAllToDo, addToDo }