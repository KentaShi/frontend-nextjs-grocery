import { postData, getData, deleteData, updateData } from "@/utils/api"

export const findAllProducts = async ({ tokens }) => {
    return await getData({ url: "/api/product/all", tokens })
}
export const findProductsByCate = async ({ cat, tokens }) => {
    return await getData({ url: `/api/product/category/${cat}`, tokens })
}
export const addNewProduct = async (data, tokens) => {
    return await postData("/api/product/", data, tokens)
}
export const deleteProduct = async (id, tokens) => {
    return await deleteData(`/api/product/${id}`, tokens)
}
export const updateProduct = async ({ id, data, tokens }) => {
    return await updateData({ url: `/api/product/${id}`, data, tokens })
}
export const searchProduct = async ({ query, tokens }) => {
    return await getData({ url: `/api/product/search?q=${query}`, tokens })
}

export const searchProductFromClient = (products, query) => {
    return products.filter((product) =>
        product.product_name.toLowerCase().includes(query.toLowerCase())
    )
}
