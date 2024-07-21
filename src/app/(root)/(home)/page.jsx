import React from "react"

import Loading from "@/components/Loading"
import dynamic from "next/dynamic"
import instance from "@/utils/api"

const ProductBlock = dynamic(() => import("@/components/ProductBlock"), {
    loading: () => <Loading />,
})

const getProducts = async () => {
    try {
        const res = await instance.get(`/api/product/categories`)
        return res.data.metadata.productsByCategory
    } catch (error) {
        console.log("Fail to fetch products: ", error.message)
    }
}

export default async function Home() {
    const productsByCategory = await getProducts()
    return (
        <>
            <title>Tập Hóa Chị Tuyết</title>
            {productsByCategory?.map((categoryData, index) => (
                <ProductBlock
                    key={index}
                    cate_slug={categoryData.category}
                    products={categoryData.products}
                />
            ))}
        </>
    )
}
