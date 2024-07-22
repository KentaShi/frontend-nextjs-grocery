"use client"
import ProductGrid from "@/components/ProductGrid"
import LinkToHome from "@/components/ui/LinkToHome"
import instance from "@/utils/api"
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid"
import { Chip } from "@material-tailwind/react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React, { Suspense, useEffect, useState } from "react"

const Search = () => {
    const searchParams = useSearchParams()
    const { q } = Object.fromEntries(searchParams.entries())

    const [products, setProducts] = useState([])
    const [title, setTitle] = useState("")

    const displayName =
        products.length > 0
            ? `Tìm thấy ${products.length} kết quả phù hợp với từ khóa “${q}”`
            : `Không tìm thấy kết quả phù hợp với từ khóa “${q}”`

    useEffect(() => {
        const searchProducts = async () => {
            setTitle(`Kết quả tìm kiếm "${q}" tại Tạp Hóa Chị Tuyết`)
            try {
                const res = await instance.get(`/api/product/search?q=${q}`)
                if (res.status === 200) {
                    const fetchedProducts = res.data.metadata.products
                    if (fetchedProducts.length > 0) {
                        setProducts(fetchedProducts)
                    } else {
                        setProducts([])
                    }
                }
            } catch (error) {
                console.log(error)
                setProducts([])
            }
        }
        searchProducts()
    }, [q])

    return (
        <>
            <title>{title}</title>
            <div className="flex flex-col items-center justify-center ">
                <div className="max-w-[618px] w-full">
                    <Chip
                        className="min-w-[288px] bg-green-2 rounded-lg w-full h-10 hover:bg-green-1 flex items-center justify-center"
                        size="md"
                        value={displayName}
                    />
                </div>
                <LinkToHome />
            </div>
            <div>
                <ProductGrid products={products} />
            </div>
        </>
    )
}

const SearchPage = () => {
    return (
        <Suspense>
            <Search />
        </Suspense>
    )
}

export default SearchPage
