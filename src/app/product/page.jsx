import Product from "@/components/Product"
import { findAllProducts } from "@/service/product"

async function getProducts() {
    const res = await findAllProducts()
    return res.metadata.products
}

const ProductPage = async () => {
    const products = await getProducts()
    return (
        <>
            <Product products={products} />
        </>
    )
}

export default ProductPage
