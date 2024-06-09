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
    const { accessToken } = authState
    useEffect(() => {
        const fetchData = async () => {
            const refreshToken = Cookies.get("refresh_token")
            const res = await findAllProducts({
                tokens: { accessToken, refreshToken },
            })

            if (res.statusCode === 200) {
                dispatch({
                    type: PRODUCT_ACTIONS.SET_PRODUCTS,
                    payload: res.metadata.products,
                })
            }
        }
        fetchData()
        // if (isAuthenticated) {
        //     fetchData()
        // }
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
