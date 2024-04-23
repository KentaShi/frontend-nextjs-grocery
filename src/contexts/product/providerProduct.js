"use client"

import { createContext, useEffect, useReducer } from "react"
import reducerProduct from "./reducerProduct"

export const initProductState = {
    products: [],
}

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducerProduct, initProductState)
    useEffect(() => {
        // continue
        const fetchData = async () => {}
        fetchData()
    }, [])
    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}
