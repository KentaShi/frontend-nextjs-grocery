"use client"
import { useAuth } from "@/contexts/auth/providerAuth"
import { useCateContext } from "@/contexts/category/providerCate"
import { useProductContext } from "@/contexts/product/providerProduct"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

const Dashboard = () => {
    const { state: productState } = useProductContext()
    const { products } = productState
    const { state: categoryState } = useCateContext()
    const { categories } = categoryState

    const { state: authState } = useAuth()
    const { user } = authState

    const router = useRouter()

    useEffect(() => {
        if (user?.roles !== "admin") router.push("/")
    }, [user])

    return (
        <div className="flex flex-col items-start justify-center gap-3">
            <div className="flex justify-center items-center px-11 py-6 bg-dark-3 rounded-lg w-full h-[200px]">
                <p className="text-white text-2xl">
                    Total Products: {products.length}
                </p>
            </div>
            <div className="flex justify-center items-center px-11 py-6 bg-dark-3 rounded-lg w-full h-[200px]">
                <p className="text-white text-2xl">
                    Total Categories: {categories.length}
                </p>
            </div>
            <div className="flex justify-center items-center px-11 py-6 bg-dark-3 rounded-lg w-full h-[200px]">
                <p className="text-white text-2xl">Total Account: 100</p>
            </div>
        </div>
    )
}

export default Dashboard
