"use client"
import Category from "@/components/Category"
import { useAuth } from "@/contexts/auth/providerAuth"
import { useCateContext } from "@/contexts/category/providerCate"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

const CategoryPage = () => {
    const { state: authState } = useAuth()
    const { user } = authState
    const { state } = useCateContext()
    const { categories } = state

    const router = useRouter()

    useEffect(() => {
        if (user?.roles !== "admin") router.push("/")
    }, [user])
    return (
        <>
            <Category categories={categories} />
        </>
    )
}

export default CategoryPage
