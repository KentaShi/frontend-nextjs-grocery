import { postData, getData, deleteData, updateData } from "@/utils/api"

export const findAllCategories = async () => {
    return await getData("/api/category/all")
}
