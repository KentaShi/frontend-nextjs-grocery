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
export const updateProduct = async (id, data, tokens) => {
    return await updateData(`/api/product/${id}`, data, tokens)
}
export const searchProduct = async (query) => {
    return await getData(`/api/product/search?q=${query}`)
}

export const searchProductFromClient = (products, query) => {
    return products.filter((product) =>
        product.product_name.toLowerCase().includes(query.toLowerCase())
    )
}
