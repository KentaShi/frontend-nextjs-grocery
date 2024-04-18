import { postData, getData } from "@/utils/api"

export const findAllProducts = async () => {
    return await getData("/api/product/all")
}
export const addNewProduct = async (data) => {
    return await postData("/api/product/", data)
}
