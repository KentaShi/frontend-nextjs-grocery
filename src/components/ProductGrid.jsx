"use client"
import React, { useCallback, useEffect, useState } from "react"

import ProductCard from "./ProductCard"

import { useSocket } from "@/contexts/socket/providerSocket"

import useIntersectionObserver from "@/hooks/useIntersectionObserver"

import Loading from "./Loading"
import { Chip } from "@material-tailwind/react"

const ProductGrid = ({ products }) => {
    const socket = useSocket()

    const PRODUCTS_PER_LOAD = 2
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(false)
    const [displayedProducts, setDisplayedProducts] = useState([])

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
        if (products?.length > 0) {
            setDisplayedProducts(products.slice(0, PRODUCTS_PER_LOAD))
            setHasMore(products.length > PRODUCTS_PER_LOAD)
        }
    }, [products])

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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 my-4 gap-4">
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

export default ProductGrid
