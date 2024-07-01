"use client"
// import Product from "@/components/Product"
import Loading from "@/components/Loading"
//use react lazy
// const Product = React.lazy(() => import("@/components/Product"))

//use dynamic next js
import dynamic from "next/dynamic"
const Product = dynamic(() => import("@/components/Product"), {
    loading: () => <Loading />,
})

import { useAuth } from "@/contexts/auth/providerAuth"
import { useProductContext } from "@/contexts/product/providerProduct"
import { useRouter } from "next/navigation"
import React, { Suspense, useEffect } from "react"

const ProductPage = () => {
    const { state } = useProductContext()
    const { products } = state

    const { state: authState } = useAuth()
    const { user } = authState

    const router = useRouter()

    useEffect(() => {
        if (user?.roles !== "admin") router.push("/")
    }, [user])
    return (
        <>
            <Product products={products} />
        </>
    )
}

export default ProductPage
