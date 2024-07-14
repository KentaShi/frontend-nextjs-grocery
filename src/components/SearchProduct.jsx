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
import ProductCard from "./ProductCard"
// const ProductCard = React.lazy(() => import("./ProductCard"))
import { useProductContext } from "@/contexts/product/providerProduct"

import { useCateContext } from "@/contexts/category/providerCate"
import { useAuth } from "@/contexts/auth/providerAuth"
import Cookies from "js-cookie"
import { errorMessages } from "@/constants"
import { useSocket } from "@/contexts/socket/providerSocket"

import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { useRouter } from "next/navigation"
import Loading from "./Loading"

import { useLogout } from "@/hooks/useLogout"
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"

const SearchProduct = () => {
    const socket = useSocket()
    const logout = useLogout()

    const { state: autheState } = useAuth()
    const { accessToken } = autheState

    const { state: cateState } = useCateContext()
    const { categories } = cateState

    const [query, setQuery] = useState("")
    const [category, setCategory] = useState("")
    const [products, setProducts] = useState([])

    const PRODUCTS_PER_LOAD = 2
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(false)
    const [displayedProducts, setDisplayedProducts] = useState([])

    const refreshToken = Cookies.get("refresh_token")
    const tokens = { accessToken, refreshToken }

    const handleSearch = async () => {
        setProducts([])
        const res = await searchProduct({ query, tokens })
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
        } else if (res.statusCode === 403) {
            toast.error(errorMessages.FORBIDDEN.vi)
            logout()
        } else {
            toast.error(errorMessages.SERVER_ERROR.vi)
        }
        setQuery("")
    }
    const handleChangeCategory = (e) => {
        setCategory(e)
    }
    const handleSelectCategory = async () => {
        setProducts([])
        setLoading(true)

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
        } else if (res.statusCode === 403) {
            toast.error(errorMessages.FORBIDDEN.vi)
            logout()
        } else {
            toast.error(errorMessages.SERVER_ERROR.vi)
        }

        setLoading(false)
    }
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

    const sentinelRef = useIntersectionObserver(loadMore, { threshold: 0.5 })

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
                    <Bars3Icon className="text-green-2 w-7 h-7 absolute !cursor-pointer flex left-1 top-1 justify-center items-center" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="search"
                        placeholder="Tìm kiêm..."
                        className="pr-20 pl-10 text-dark-2"
                        containerProps={{
                            className: "min-w-[288px]",
                        }}
                    />
                    <Button
                        onClick={handleSearch}
                        size="sm"
                        className="!absolute right-1 top-1 rounded bg-green-2"
                    >
                        <MagnifyingGlassIcon className="w-4 h-4" />
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
                        className="!absolute right-1 top-1 rounded bg-green-2"
                    >
                        <MagnifyingGlassIcon className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 my-4 gap-4">
                {displayedProducts?.length > 0 &&
                    displayedProducts.map((product, index) => {
                        return (
                            <ProductCard
                                key={index}
                                index={index}
                                product={product}
                            />
                        )
                    })}
                <div ref={sentinelRef} style={{ height: "400px" }}></div>
                {loading && <Loading />}
            </div>
        </>
    )
}

export default SearchProduct
