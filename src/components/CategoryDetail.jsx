"use client"
import { errorMessages } from "@/constants"
import { useAuth } from "@/contexts/auth/providerAuth"
import { useLogout } from "@/hooks/useLogout"
import { findProductsByCate } from "@/service/product"
import Cookies from "js-cookie"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProductGrid from "./ProductGrid"
import { Chip } from "@material-tailwind/react"

const CategoryDetail = ({ slug }) => {
    const logout = useLogout()
    const { state } = useAuth()
    const { accessToken } = state
    const refreshToken = Cookies.get("refresh_token")
    const tokens = { accessToken, refreshToken }

    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await findProductsByCate(slug, tokens)
                if (res.statusCode === 200) {
                    setProducts(res.metadata.products)
                } else if (res.statusCode === 403) {
                    toast.error(errorMessages.FORBIDDEN.vi)
                    logout()
                } else {
                    toast.error(errorMessages.SERVER_ERROR.vi)
                }
            } catch (error) {
                console.log(error.message)
                toast.error(errorMessages.SERVER_ERROR.vi)
            }
        }
        getProducts()
    }, [slug])
    return (
        <>
            <div className="flex items-center justify-center ">
                <div className="max-w-[618px] w-full">
                    <Chip
                        className="min-w-[288px] bg-green-2 rounded-lg w-full h-10 hover:bg-green-1 flex items-center justify-center"
                        size="md"
                        value={slug}
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
