import CategoryDetail from "@/components/CategoryDetail"
import instance from "@/utils/api"
import React from "react"

const getProducts = async (slug) => {
    try {
        const res = await instance.get(`/api/product/category/${slug}`)
        return res.data.metadata.products
    } catch (error) {
        console.log("Fail to fetch products: ", error.message)
    }
}

const Category = async ({ params: { slug } }) => {
    const products = await getProducts(slug)
    return (
        <>
            <CategoryDetail slug={slug} products={products} />
        </>
    )
}

export default Category
