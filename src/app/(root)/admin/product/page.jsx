"use client"
import Loading from "@/components/Loading"

//use dynamic next js
import dynamic from "next/dynamic"
const Product = dynamic(() => import("@/components/admin/Product"), {
    loading: () => <Loading />,
})

import { useAuth } from "@/contexts/auth/providerAuth"
import { useRouter } from "next/navigation"
import React, { Suspense, useEffect, useState } from "react"

const ProductPage = () => {
    const { state: authState } = useAuth()
    const { user } = authState
    const router = useRouter()

    useEffect(() => {
        if (user && user?.role !== "admin") router.push("/")
    }, [user, router])
    return (
        <>
            <Product />
        </>
    )
}

export default ProductPage
