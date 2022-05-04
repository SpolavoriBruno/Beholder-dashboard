import axios from "axios"

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            return window.location = '/'
        }
        return Promise.reject(error)
    }
)

export default axios
