import axios from 'axios'

const baseUrl = "http://localhost:5000/coursesapi"

const getAllcourses = (setCourses) => {
    axios
        .get(baseUrl)
        .then(({ data }) => {
            console.log('data ---> ', data);
            setCourses(data)
        })
}


const getcompletedcourses = (setCourses) => {
    axios
        .get("http://localhost:5000/coursesapicompleted")
        .then(({ data }) => {
            console.log('data ---> ', data);
            setCourses(data)
        })
}

export { getAllcourses , getcompletedcourses };