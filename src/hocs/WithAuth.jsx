"use client"
import { useAuth } from "@/contexts/auth/state"
import { useEffect } from "react"
import { redirect } from "next/navigation"

const WithAuth = (Component) => {
    const Auth = (props) => {
        const { state } = useAuth()
        const { isAuthenticated } = state

        useEffect(() => {
            if (!isAuthenticated) {
                return redirect("/login")
            }
        }, [])

        if (!isAuthenticated) {
            return null
        }

        return <Component {...props} />
    }

    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps
    }

    return Auth
}

export default WithAuth
