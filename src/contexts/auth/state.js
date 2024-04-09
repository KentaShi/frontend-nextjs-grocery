"use client"

import reducer from "./reducer"
import React, { createContext, useContext, useEffect, useReducer } from "react"

export const initState = {
    isAuthenticated: false,
    user: null,
    tokens: {
        accessToken: null,
        refreshToken: null,
    },
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {}, [])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
