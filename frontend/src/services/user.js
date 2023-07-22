import axiosInstance from "@/configs/api";

export const userService = {
    getUsers : () => axiosInstance.get('/user')
}