import axiosInstance from "@/configs/api"

export const categoryService = {
    getCategories: () => {
        return axiosInstance.get('/category')
    }
}