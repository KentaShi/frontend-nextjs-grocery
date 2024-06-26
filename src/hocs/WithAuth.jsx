"use client"
import { useAuth } from "@/contexts/auth/providerAuth"
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
        }, [isAuthenticated])

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
