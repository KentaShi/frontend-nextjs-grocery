import { postData, getData, deleteData, updateData } from "@/utils/api"

export const findAllProducts = async () => {
    return await getData("/api/product/all")
}
export const findProductsByCate = async (cat) => {
    return await getData(`/api/product/category/${cat}`)
}
export const addNewProduct = async (data) => {
    return await postData("/api/product/", data)
}
export const deleteProduct = async (id) => {
    return await deleteData(`/api/product/${id}`)
}
export const updateProduct = async (id, data) => {
    return await updateData(`/api/product/${id}`, data)
}
export const searchProduct = async (query) => {
    return await getData(`/api/product/search?q=${query}`)
}
