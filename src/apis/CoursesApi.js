import axios from 'axios'

const baseUrl = "http://localhost:5000/courses/get"

const getAllcourses = (setCourses) => {
    axios
        .get(baseUrl)
        .then(({ data }) => {
            setCourses(data)
        })
}


const getcompletedcourses = (setCourses) => {
    axios
        .get("http://localhost:5000/coursesapicompleted")
        .then(({ data }) => {
            setCourses(data)
        })
}

export { getAllcourses , getcompletedcourses };