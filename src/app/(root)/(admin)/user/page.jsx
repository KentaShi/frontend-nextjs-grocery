"use client"
import { useAuth } from "@/contexts/auth/providerAuth"
import { findAllUsers } from "@/service/user"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Loading from "@/components/Loading"
const User = dynamic(() => import("@/components/User"), {
    loading: () => <Loading />,
})

const UserPage = () => {
    const { state: authState } = useAuth()
    const { user, accessToken } = authState
    const refreshToken = Cookies.get("refresh_token")
    const tokens = { accessToken, refreshToken }
    const router = useRouter()

    const [users, setUsers] = useState([])

    useEffect(() => {
        if (user?.roles !== "admin") router.push("/")
        else {
            const fetchData = async () => {
                const res = await findAllUsers(tokens)
                if (res.statusCode === 200) {
                    setUsers(res.metadata?.users)
                }
                console.log(users)
            }
            fetchData()
        }
    }, [])
    return (
        <>
            <User users={users} />
        </>
    )
}

export default UserPage
