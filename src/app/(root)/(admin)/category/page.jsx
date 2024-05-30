"use client"
import Category from "@/components/Category"
import { useCateContext } from "@/contexts/category/providerCate"
import React from "react"

const CategoryPage = () => {
    const { state } = useCateContext()
    const { categories } = state
    return (
        <>
            <Category categories={categories} />
        </>
    )
}

export default CategoryPage
