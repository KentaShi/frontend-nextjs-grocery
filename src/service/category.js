import { postData, getData, deleteData, updateData } from "@/utils/api"

export const findAllCategories = async () => {
    return await getData("/api/category/all")
}
export const addCategory = async ({ data, tokens }) => {
    return await postData("/api/category/", data, tokens)
}
export const deleteCategory = async ({ data, tokens }) => {
    return await deleteData("/api/category/", data, tokens)
}
