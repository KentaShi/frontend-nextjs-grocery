"use client"
import { useAuth } from "@/contexts/auth/providerAuth"
import React, { useEffect } from "react"
import { redirect } from "next/navigation"

const ProfilePage = () => {
    const { state } = useAuth()
    const { user, isAuthenticated } = state

    useEffect(() => {
        if (!isAuthenticated) {
            return redirect("/login")
        }
    }, [isAuthenticated])
    return <div>Hello {user?.username}</div>
}

export default ProfilePage
