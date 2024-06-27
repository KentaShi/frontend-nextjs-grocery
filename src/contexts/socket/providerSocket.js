"use client"

import { io } from "socket.io-client"

const { createContext, useContext, useState, useEffect } = require("react")

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    useEffect(() => {
        const newSocket = io(BASE_URL)
        setSocket(newSocket)

        return () => newSocket.close()
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
