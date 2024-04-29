"use client"

import { createContext, useContext, useEffect, useReducer } from "react"
import reducerProduct from "./reducerProduct"
import { findAllProducts } from "@/service/product"
import { useAuth } from "../auth/providerAuth"

export const initProductState = {
    products: [],
}

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const { state: authState } = useAuth()
    const { isAuthenticated } = authState

    const [state, dispatch] = useReducer(reducerProduct, initProductState)
    useEffect(() => {
        const fetchData = async () => {
            const res = await findAllProducts()
            dispatch({ type: "SET_PRODUCTS", payload: res.metadata.products })
        }
        if (isAuthenticated) {
            fetchData()
        }
    }, [authState])
    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}
export const useProductContext = () => {
    return useContext(ProductContext)
}
