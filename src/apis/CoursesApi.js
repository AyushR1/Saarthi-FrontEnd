import axios from 'axios'

const baseUrl = "https://saarthi.onrender.com/courses/get"

const getAllcourses = (setCourses) => {
    axios
        .get(baseUrl)
        .then(({ data }) => {
            setCourses(data)
        })
}


const getcompletedcourses = (setCourses) => {
    axios
        .get("https://saarthi.onrender.com/coursesapicompleted")
        .then(({ data }) => {
            setCourses(data)
        })
}

export { getAllcourses , getcompletedcourses };