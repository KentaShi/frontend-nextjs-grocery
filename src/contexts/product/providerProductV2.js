"use client"

import { createContext, useContext, useEffect, useState } from "react"

import Cookies from "js-cookie"
import { useAuth } from "../auth/providerAuth"
import { findAllProducts } from "@/service/product"
import toast from "react-hot-toast"
import { errorMessages } from "@/constants"
import { useSocket } from "../socket/providerSocket"

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const socket = useSocket()

    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const { state: authState } = useAuth()
    const { accessToken, isAuthenticated } = authState
    const refreshToken = Cookies.get("refresh_token")
    const tokens = { accessToken, refreshToken }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await findAllProducts({
                    tokens,
                    page: currentPage,
                })

                if (res.statusCode === 200) {
                    setProducts(res.metadata.products)
                    setTotalPages(res.metadata.totalPages)
                } else {
                    toast.error(errorMessages.SERVER_ERROR.vi)
                }
            } catch (error) {
                console.error(error.message)
                toast.error(errorMessages.SERVER_ERROR.vi)
            }
        }
        if (isAuthenticated) fetchData()
    }, [currentPage, isAuthenticated])

    useEffect(() => {
        if (!socket) {
            return
        }
        socket.on("productUpdated", (updatedProduct) => {
            if (products) {
                setProducts(
                    products.map((p) =>
                        p._id === updatedProduct._id ? updatedProduct : p
                    )
                )
            }
        })
        socket.on("productDeleted", (id) => {
            if (products) {
                setProducts(products.filter((p) => p._id !== id))
            }
        })
        return () => {
            socket.off("productUpdated")
            socket.off("productDeleted")
        }
    }, [socket, products])
    return (
        <ProductContext.Provider
            value={{ products, currentPage, setCurrentPage, totalPages }}
        >
            {children}
        </ProductContext.Provider>
    )
}
export const useProductContext = () => {
    return useContext(ProductContext)
}
