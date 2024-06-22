"use client"

import { createContext, useContext, useEffect, useReducer } from "react"
import reducerProduct from "./reducerProduct"
import { findAllProducts } from "@/service/product"

import { PRODUCT_ACTIONS } from "./actionProduct"
import Cookies from "js-cookie"
import { useAuth } from "../auth/providerAuth"

export const initProductState = {
    products: [],
}

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducerProduct, initProductState)

    const { state: authState } = useAuth()
    const { isAuthenticated } = authState
    const { accessToken } = authState
    const refreshToken = Cookies.get("refresh_token")
    const tokens = { accessToken, refreshToken }
    useEffect(() => {
        const fetchData = async () => {
            const res = await findAllProducts({
                tokens,
            })

            if (res.statusCode === 200) {
                dispatch({
                    type: PRODUCT_ACTIONS.SET_PRODUCTS,
                    payload: res.metadata.products,
                })
            }
        }

        if (isAuthenticated) {
            fetchData()
        }
    }, [isAuthenticated])
    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}
export const useProductContext = () => {
    return useContext(ProductContext)
}
