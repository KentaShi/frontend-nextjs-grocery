"use client"

import { io } from "socket.io-client"
import { useAuth } from "../auth/providerAuth"

const { createContext, useContext, useState, useEffect } = require("react")

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const { state: authState } = useAuth()
    const { user } = authState

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    useEffect(() => {
        if (user) {
            const newSocket = io(BASE_URL)
            newSocket.emit("identify", user._id)
            setSocket(newSocket)
            return () => newSocket.close()
        }
        return
    }, [user])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
