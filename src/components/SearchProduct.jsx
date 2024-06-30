"use client"
import {
    findAllProducts,
    findProductsByCate,
    searchProduct,
    searchProductFromClient,
} from "@/service/product"
import { Button, Input, Option, Select } from "@material-tailwind/react"
import React, { Suspense, useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
// import ProductCard from "./ProductCard"
const ProductCard = React.lazy(() => import("./ProductCard"))
import { useProductContext } from "@/contexts/product/providerProduct"

import { useCateContext } from "@/contexts/category/providerCate"
import { useAuth } from "@/contexts/auth/providerAuth"
import Cookies from "js-cookie"
import { errorMessages } from "@/constants"
import { useSocket } from "@/contexts/socket/providerSocket"

import useIntersectionObserver from "@/hooks/useIntersectionObserver"

const SearchProduct = () => {
    const socket = useSocket()

    const { state: autheState } = useAuth()
    const { accessToken } = autheState

    const { state } = useProductContext()
    const { state: cateState } = useCateContext()
    const { categories } = cateState
    const { products: productsData } = state
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState("")
    const [products, setProducts] = useState([])

    const PRODUCTS_PER_LOAD = 2
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(false)
    const [displayedProducts, setDisplayedProducts] = useState([])

    const refreshToken = Cookies.get("refresh_token")
    const tokens = { accessToken, refreshToken }

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) {
            return
        }
        setLoading(true)
        const nextProducts = products.slice(
            displayedProducts.length,
            displayedProducts.length + PRODUCTS_PER_LOAD
        )
        setDisplayedProducts((prevProducts) => [
            ...prevProducts,
            ...nextProducts,
        ])
        setLoading(false)
        setHasMore(
            displayedProducts.length + nextProducts.length < products.length
        )
    }, [loading, hasMore, products, displayedProducts])

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
        setLoading(true)

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
                const fetchedProducts = res.metadata.products
                if (fetchedProducts.length === 0) {
                    toast.error(errorMessages.NOTFOUND.en)
                } else {
                    setProducts(fetchedProducts)
                    setDisplayedProducts(
                        fetchedProducts.slice(0, PRODUCTS_PER_LOAD)
                    )

                    setHasMore(fetchedProducts.length > PRODUCTS_PER_LOAD)
                }
            } else {
                toast.error(errorMessages.SERVER_ERROR.vi)
            }
        }
        setLoading(false)
    }

    const sentinelRef = useIntersectionObserver(loadMore, { threshold: 1 })

    // useEffect(() => {
    //     setLoading(true)
    // }, [])

    useEffect(() => {
        if (!socket) return
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
    }, [socket, products])

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
                {displayedProducts?.length > 0 &&
                    displayedProducts.map((product, index) => {
                        return (
                            <Suspense fallback="Loading...">
                                <ProductCard key={index} product={product} />
                            </Suspense>
                        )
                    })}
                <div ref={sentinelRef} style={{ height: "400px" }}></div>
                {loading && (
                    <div className="flex items-center justify-center">
                        <p className="text-white text-xl">Loading...</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default SearchProduct
