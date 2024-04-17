import { getData } from "@/utils/api"
import React from "react"

async function getProducts() {
    const res = await getData("/product")
    console.log(res)
    const products = res.products

    return products
}

const ProductPage = async () => {
    const products = await getProducts()
    return <div>ProductPage</div>
}

export default ProductPage
