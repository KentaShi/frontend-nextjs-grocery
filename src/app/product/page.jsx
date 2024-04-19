import Product from "@/components/Product"
import { findAllProducts } from "@/service/product"

async function getProducts() {
    const res = await findAllProducts()
    return res.metadata.products
}

const ProductPage = async () => {
    const products = await getProducts()
    return (
        <div>
            <Product products={products} />
        </div>
    )
}

export default ProductPage
