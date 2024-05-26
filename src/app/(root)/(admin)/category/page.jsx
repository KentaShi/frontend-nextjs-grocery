import Category from "@/components/Category"
import { findAllCategories } from "@/service/category"
import React from "react"

const CategoryPage = async () => {
    const res = await findAllCategories()
    return (
        <>
            <Category categories={res?.metadata?.categories} />
        </>
    )
}

export default CategoryPage
