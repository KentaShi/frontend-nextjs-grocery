"use client"
import ProductGrid from "@/components/ProductGrid"
import instance from "@/utils/api"
import { Chip } from "@material-tailwind/react"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const SearchPage = () => {
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
        setTitle(`Kết quả tìm kiếm "${q}" tại Tạp Hóa Chị Tuyết`)
    }, [q])

    return (
        <>
            <title>{title}</title>
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

export default SearchPage
