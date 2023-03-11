import axios from 'axios'

const baseUrl = "https://saarthi.onrender.com/coursesapi"

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
        .get("https://saarthi.onrender.com/coursesapicompleted")
        .then(({ data }) => {
            console.log('data ---> ', data);
            setCourses(data)
        })
}

export { getAllcourses , getcompletedcourses };