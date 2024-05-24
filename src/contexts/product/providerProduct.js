"use client"

import { createContext, useContext, useEffect, useReducer } from "react"
import reducerProduct from "./reducerProduct"
import { findAllProducts } from "@/service/product"

import { PRODUCT_ACTIONS } from "./actionProduct"

export const initProductState = {
    products: [],
}

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducerProduct, initProductState)
    useEffect(() => {
        const fetchData = async () => {
            const res = await findAllProducts()

            if (res.staus === 200) {
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
    }, [])
    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}
export const useProductContext = () => {
    return useContext(ProductContext)
}
