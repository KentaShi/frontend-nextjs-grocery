"use client"
import {
    findAllProducts,
    findProductsByCate,
    searchProduct,
    searchProductFromClient,
} from "@/service/product"
import { Button, Input, Option, Select } from "@material-tailwind/react"
import React, { useState } from "react"
import toast from "react-hot-toast"
import ProductCard from "./ProductCard"
import { useProductContext } from "@/contexts/product/providerProduct"

const SearchProduct = () => {
    const { state } = useProductContext()
    const { products: productsData } = state
    const [query, setQuery] = useState("")
    const [products, setProducts] = useState()
    const handleSearch = async () => {
        // search in client
        const res = searchProductFromClient(productsData, query)
        setProducts(res)
        // search in server
        // const res = await searchProduct(query)
        // if (res.status === 200) {
        //     setProducts(res.metadata.products)
        // } else {
        //     toast.error(res.message)
        //     setProducts(null)
        // }
        setQuery("")
    }
    const handleSelectCategory = async (e) => {
        let res
        if (e === "all") {
            res = await findAllProducts()
        } else {
            res = await findProductsByCate(e)
        }
        if (res.status === 200) {
            setProducts(res.metadata.products)
        } else {
            toast.error(res.message)
        }
    }
    return (
        <>
            <div className="flex flex-col lg:flex-row">
                <div className="relative flex w-full gap-2 mb-2">
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="search"
                        color="gray"
                        label="Type here..."
                        className="pr-20"
                        containerProps={{
                            className: "min-w-[288px]",
                        }}
                    />
                    <Button
                        onClick={handleSearch}
                        size="sm"
                        color="blue-gray"
                        className="!absolute right-1 top-1 rounded"
                    >
                        Search
                    </Button>
                </div>
                <div className="flex w-full gap-2 mb-2 ">
                    <Select
                        onChange={handleSelectCategory}
                        name="category"
                        label="Phân Loại"
                    >
                        <Option value="all">Tất Cả</Option>
                        <Option value="coffee">Cà Phê</Option>
                        <Option value="drink">Nước Ngọt</Option>
                        <Option value="vegetable">Rau Củ</Option>
                    </Select>
                </div>
            </div>

            <div className="overflow-scroll px-0 grid grid-cols-2 my-4 gap-1">
                {products?.length > 0 &&
                    products.map((product, index) => {
                        return <ProductCard key={index} product={product} />
                    })}
            </div>
        </>
    )
}

export default SearchProduct
