"use client"

import { getAuth } from "@/service/access"
import reducer from "./reducerAuth"
import React, { createContext, useContext, useEffect, useReducer } from "react"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { AUTH_ACTIONS } from "./actionAuth"

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
            const refreshToken = Cookies.get("refresh_token")
            if (!refreshToken) {
                return toast.error("Vui lòng đăng nhập....")
            }
            const res = await getAuth({ refreshToken })
            if (res.status === 200) {
                const metadata = res.metadata
                dispatch({
                    type: AUTH_ACTIONS.AUTH,
                    payload: {
                        user: metadata.user,
                        accessToken: metadata.tokens.accessToken,
                    },
                })
                toast.success(res.message)
            } else {
                toast.error(res.message)
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
