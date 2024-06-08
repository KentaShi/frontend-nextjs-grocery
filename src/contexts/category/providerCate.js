"use client"

import { createContext, useContext, useEffect, useReducer } from "react"
import reducerCate from "./reducerCate"
import { CATE_ACTIONS } from "./actionCate"
import { findAllCategories } from "@/service/category"
import { useAuth } from "../auth/providerAuth"
import Cookies from "js-cookie"

export const initCategoryState = {
    categories: [],
}

const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducerCate, initCategoryState)

    const { state: authState } = useAuth()
    const { accessToken } = authState
    const refreshToken = Cookies.get("refresh_token")
    const tokens = { accessToken, refreshToken }

    useEffect(() => {
        const fetchData = async () => {
            const res = await findAllCategories({
                tokens,
            })
            if (res.status === 200) {
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
