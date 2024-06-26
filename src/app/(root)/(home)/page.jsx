"use client"
// import SearchProduct from "@/components/SearchProduct"
const SearchProduct = React.lazy(() => import("@/components/SearchProduct"))
import { useAuth } from "@/contexts/auth/providerAuth"
import React, { Suspense, useEffect } from "react"
import { useRouter } from "next/navigation"
import Loading from "@/components/Loading"

export default function Home() {
    const { state } = useAuth()
    const { isAuthenticated } = state

    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) return router.push("/login")
    }, [state])
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold mb-4 text-white">
                Welcome to Tap Hoa
            </div>
            <div>
                <Suspense fallback={<Loading />}>
                    <SearchProduct />
                </Suspense>
            </div>
        </div>
    )
}
