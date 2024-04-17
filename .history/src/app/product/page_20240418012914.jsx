import Product from "@/components/Product"
import { getData } from "@/utils/api"

async function getProducts() {
    const res = await getData("/product/all")
    console.log(res)
    const products = res.products

    return products
}

const ProductPage = async () => {
    const products = await getProducts()
    const message = "test props"
    return (
        <>
            <Product message={message} />
        </>
    )
}

export default ProductPage
