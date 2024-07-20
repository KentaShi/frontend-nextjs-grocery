"use client"

import React, { useMemo } from "react"
import ProductGrid from "./ProductGrid"
import { Chip } from "@material-tailwind/react"
import { useCateContext } from "@/contexts/category/providerCate"

const CategoryDetail = ({ slug, products }) => {
    const { state: cateState } = useCateContext()
    const { categories } = cateState

    const cateName = useMemo(() => {
        const cate = categories.find((c) => c.cate_slug === slug)
        return cate?.cate_name
    }, [slug, categories])

    const displayName = `${cateName} (${products.length} sản phẩm})`

    return (
        <>
            <title>{cateName}</title>
            <div className="flex items-center justify-center ">
                <div className="max-w-[618px] w-full">
                    <Chip
                        className="min-w-[288px] bg-green-2 rounded-lg w-full h-10 hover:bg-green-1 flex items-center justify-center"
                        size="md"
                        value={displayName}
                    />
                </div>
            </div>
            <div>
                <ProductGrid products={products} />
            </div>
        </>
    )
}

export default CategoryDetail
