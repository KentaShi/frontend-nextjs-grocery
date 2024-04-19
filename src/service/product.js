import { postData, getData, deleteData } from "@/utils/api"

export const findAllProducts = async () => {
    return await getData("/api/product/all")
}
export const addNewProduct = async (data) => {
    return await postData("/api/product/", data)
}
export const deleteProduct = async (id) => {
    return await deleteData(`/api/product/${id}`)
}
