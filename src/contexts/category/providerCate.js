"use client"

import { createContext, useContext, useEffect, useReducer } from "react"
import reducerCate from "./reducerCate"
import { CATE_ACTIONS } from "./actionCate"
import { findAllCategories } from "@/service/category"

export const initCategoryState = {
    categories: [],
}

const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducerCate, initCategoryState)

    useEffect(() => {
        const fetchData = async () => {
            const res = await findAllCategories()
            if (res.statusCode === 200) {
                dispatch({
                    type: CATE_ACTIONS.SET_CATEGORIES,
                    payload: res.metadata.categories,
                })
            }
        }

        fetchData()
    }, [])

    return (
        <CategoryContext.Provider value={{ state, dispatch }}>
            {children}
        </CategoryContext.Provider>
    )
}
export const useCateContext = () => {
    return useContext(CategoryContext)
}
