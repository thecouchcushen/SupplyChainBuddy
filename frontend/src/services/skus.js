import axios from 'axios'

const baseUrl = "http://localhost:3001/skus"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}