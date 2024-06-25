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
import { useCateContext } from "@/contexts/category/providerCate"
import { useAuth } from "@/contexts/auth/providerAuth"
import Cookies from "js-cookie"
import { errorMessages } from "@/constants"

const SearchProduct = () => {
    const socket = io("http://localhost:3030")

    const { state: autheState } = useAuth()
    const { accessToken } = autheState

    const { state } = useProductContext()
    const { state: cateState } = useCateContext()
    const { categories } = cateState
    const { products: productsData } = state
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState("")
    const [products, setProducts] = useState([])

    const refreshToken = Cookies.get("refresh_token")
    const tokens = { accessToken, refreshToken }
    const handleSearch = async () => {
        // search in client
        // const res = searchProductFromClient(productsData, query)
        // setProducts(res)
        // search in server
        setProducts([])
        const res = await searchProduct({ query, tokens })
        if (res.statusCode === 200) {
            setProducts(res.metadata.products)
        } else if (res.statusCode === 404) {
            toast.error("Không có sản phẩm")
            setProducts([])
        } else {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
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
            const res = await findAllProducts({ tokens })
            if (res.status === 200) {
                setProducts(res.metadata.products)
            } else {
                toast.error(res.message)
            }
        } else {
            const res = await findProductsByCate({ cat: category, tokens })
            if (res.statusCode === 200) {
                setProducts(res.metadata.products)
            } else if (res.statusCode === 404) {
                toast.error("Không có sản phẩm")
            } else {
                toast.error(errorMessages.SERVER_ERROR.vi)
            }
        }
    }
    useEffect(() => {
        socket.on("productUpdated", (updatedProduct) => {
            if (products) {
                setProducts(
                    products.map((p) =>
                        p._id === updatedProduct._id ? updatedProduct : p
                    )
                )
            }
        })
        return () => {
            socket.off("productUpdated")
        }
    }, [])
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
                        {categories.map((cate, index) => (
                            <Option key={index} value={cate.cate_slug}>
                                {cate.cate_name}
                            </Option>
                        ))}
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

            <div className="px-0 grid grid-cols-2 my-4 gap-1">
                {products?.length > 0 &&
                    products.map((product, index) => {
                        return <ProductCard key={index} product={product} />
                    })}
            </div>
        </>
    )
}

export default SearchProduct
