"use client"
import Product from "@/components/Product"
import { useProductContext } from "@/contexts/product/providerProduct"

const ProductPage = () => {
    const { state } = useProductContext()
    const { products } = state
    return (
        <div>
            <Product products={products} />
        </div>
    )
}

export default ProductPage
