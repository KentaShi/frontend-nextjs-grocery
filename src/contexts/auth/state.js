"use client"

import { getAuth } from "@/service/access"
import reducer from "./reducer"
import React, { createContext, useContext, useEffect, useReducer } from "react"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { ACTIONS } from "./action"

export const initState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {
        const fetchData = async () => {
            const firstLogin = localStorage.getItem("firstLogin")
            if (firstLogin) {
                const refreshToken = Cookies.get("refresh_token")
                const res = await getAuth({ refreshToken })
                if (res.status === 200) {
                    const metadata = res.metadata
                    dispatch({
                        type: ACTIONS.AUTH,
                        payload: {
                            user: metadata.user,
                            accessToken: metadata.tokens.accessToken,
                        },
                    })
                    toast.success(res.message)
                } else {
                    localStorage.removeItem("firstLogin")
                    toast.error(res.message)
                }
            }
        }
        fetchData()
    }, [])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
