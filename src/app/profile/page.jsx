"use client"
import { useAuth } from "@/contexts/auth/state"
import WithAuth from "@/hocs/WithAuth"
import React, { useEffect } from "react"
import { redirect } from "next/navigation"

const ProfilePage = () => {
    const { state } = useAuth()
    const { isAuthenticated } = state

    useEffect(() => {
        if (!isAuthenticated) {
            return redirect("/login")
        }
    }, [isAuthenticated])
    return <div>ProfilePage</div>
}

export default ProfilePage
