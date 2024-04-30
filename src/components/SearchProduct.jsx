"use client"
import {
    findAllProducts,
    findProductsByCate,
    searchProduct,
    searchProductFromClient,
} from "@/service/product"
import { Button, Input, Option, Select } from "@material-tailwind/react"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProductCard from "./ProductCard"
import { useProductContext } from "@/contexts/product/providerProduct"
import { io } from "socket.io-client"

const SearchProduct = () => {
    const socket = io("http://localhost:3030")
    const { state } = useProductContext()
    const { products: productsData } = state
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState("")
    const [products, setProducts] = useState([])
    const handleSearch = async () => {
        // search in client
        // const res = searchProductFromClient(productsData, query)
        // setProducts(res)
        // search in server
        setProducts([])
        const res = await searchProduct(query)
        if (res.status === 200) {
            setProducts(res.metadata.products)
        } else {
            toast.error(res.message)
            setProducts([])
        }
        setQuery("")
    }
    const handleChangeCategory = (e) => {
        setCategory(e)
    }
    const handleSelectCategory = async () => {
        setProducts([])
        if (category === "all") {
            const res = await findAllProducts()
            if (res.status === 200) {
                setProducts(res.metadata.products)
            } else {
                toast.error(res.message)
            }
        } else {
            const res = await findProductsByCate(category)
            if (res.status === 200) {
                setProducts(res.metadata.products)
            } else {
                toast.error(res.message)
            }
        }
    }
    useEffect(() => {
        socket.on("updated", (updatedProduct) => {
            if (products) {
                setProducts(
                    products.map((p) =>
                        p._id === updatedProduct._id ? updatedProduct : p
                    )
                )
            }
        })
    }, [products])
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
                <div className="relative flex w-full gap-2 mb-2 ">
                    <Select
                        onChange={handleChangeCategory}
                        name="category"
                        label="Phân Loại"
                    >
                        <Option value="all">Tất Cả</Option>
                        <Option value="coffee">Cà Phê</Option>
                        <Option value="drink">Nước Ngọt</Option>
                        <Option value="vegetable">Rau Củ</Option>
                    </Select>
                    <Button
                        onClick={handleSelectCategory}
                        size="sm"
                        color="blue-gray"
                        className="!absolute right-1 top-1 rounded"
                    >
                        Search
                    </Button>
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
