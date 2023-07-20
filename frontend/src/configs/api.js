import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

axiosInstance.interceptors.response.use((res) => {
    console.log('interceptors 1')

    return res.data
})

axiosInstance.interceptors.response.use((res) => {
    console.log('interceptors 2')

    return res
})

axiosInstance.interceptors.response.use((res) => {
    console.log('interceptors 3')

    return res
})


axiosInstance.interceptors.response.use((res) => {
    console.log('interceptors 4')

    return res
})

export default axiosInstance