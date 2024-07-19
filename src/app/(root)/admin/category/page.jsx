"use client"
// import Category from "@/components/Category"
const Category = React.lazy(() => import("@/components/admin/Category"))
import Loading from "@/components/Loading"
import { useAuth } from "@/contexts/auth/providerAuth"
import { useCateContext } from "@/contexts/category/providerCate"
import { useRouter } from "next/navigation"
import React, { Suspense, useEffect } from "react"

const CategoryPage = () => {
    const { state: authState } = useAuth()
    const { user } = authState
    const { state } = useCateContext()
    const { categories } = state

    const router = useRouter()

    useEffect(() => {
        if (user?.role !== "admin") router.push("/")
    }, [user])
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Category categories={categories} />
            </Suspense>
        </>
    )
}

export default CategoryPage
