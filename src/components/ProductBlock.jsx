"use client"
import React, { useMemo } from "react"
import ProductCard from "./ProductCard"
import Link from "next/link"
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid"
import { useCateContext } from "@/contexts/category/providerCate"

const ProductBlock = ({ cate_slug, products }) => {
    const { state: cateState } = useCateContext()
    const { categories } = cateState

    const cateName = useMemo(() => {
        const cate = categories.find((c) => c.cate_slug === cate_slug)
        return cate?.cate_name
    }, [cate_slug, categories])
    return (
        <>
            <div className="bg-green-100 my-4 rounded-lg">
                <div className="w-full flex justify-center">
                    <p className="text-white min-w-[288px] max-w-[309px]  bg-green-2 rounded-b-lg w-full h-10 hover:bg-green-1 flex items-center justify-center uppercase font-bold text-base">
                        {cateName}
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 my-4 mx-4 gap-4">
                    {products.length > 0 &&
                        products.map((product, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    index={index}
                                    product={product}
                                />
                            )
                        })}
                </div>
                <div className="flex items-center justify-center">
                    <Link
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                        href={`/category/${cate_slug}`}
                    >
                        {products.length >= 4 && (
                            <div className="flex flex-row items-center p-2">
                                <ChevronDoubleLeftIcon className="w-6 h-6" />
                                <p className="text-xs">Xem thêm</p>
                                <ChevronDoubleRightIcon className="w-6 h-6" />
                            </div>
                        )}
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ProductBlock
