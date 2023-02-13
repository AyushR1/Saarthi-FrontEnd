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


export { getAllcourses };