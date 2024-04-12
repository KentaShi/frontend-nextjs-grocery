"use client"
import { useAuth } from "@/contexts/auth/state"
import React, { useEffect } from "react"
import { redirect } from "next/navigation"

const AdmminPage = () => {
    const { state } = useAuth()
    const { user } = state
    useEffect(() => {
        if (user?.roles !== "admin") {
            return redirect("/")
        }
    }, [])

    return <div>AdminPage</div>
}

export default AdmminPage
