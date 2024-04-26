"use client"
import { searchProduct } from "@/service/product"
import { Button, Input, Option, Select } from "@material-tailwind/react"
import React, { useState } from "react"
import toast from "react-hot-toast"
import ProductCard from "./ProductCard"

const SearchProduct = () => {
    const [query, setQuery] = useState("")
    const [products, setProducts] = useState()
    const handleSearch = async () => {
        const res = await searchProduct(query)
        if (res.status === 200) {
            setProducts(res.metadata.products)
        } else {
            toast.error(res.message)
            setProducts(null)
        }
        setQuery("")
    }
    return (
        <div>
            <div className="relative flex w-full gap-2 mb-2 md:w-max">
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="search"
                    color="gray"
                    label="Type here..."
                    className="pr-20"
                    containerProps={{
                        className: "min-w-[288px]",
                    }}
                />
                <Button
                    onClick={handleSearch}
                    size="sm"
                    color="blue-gray"
                    className="!absolute right-1 top-1 rounded"
                >
                    Search
                </Button>
            </div>
            <div className="flex w-full gap-2 mb-2 md:w-max">
                <Select label="Phân Loại">
                    <Option>Ca phe</Option>
                    <Option>Nuoc ngot</Option>
                </Select>
            </div>
            <div className="overflow-scroll px-0 grid grid-cols-2 my-4">
                {products?.length > 0 &&
                    products.map((product, index) => {
                        return <ProductCard key={index} product={product} />
                    })}
            </div>
        </div>
    )
}

export default SearchProduct
