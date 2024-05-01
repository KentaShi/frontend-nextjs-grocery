"use client"
import SearchProduct from "@/components/SearchProduct"
import { useAuth } from "@/contexts/auth/providerAuth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
    const { state } = useAuth()
    const { isAuthenticated } = state

    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) return router.push("/login")
    }, [state])
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold mb-4">Welcome to Tap Hoa</div>
            <div>
                <SearchProduct />
            </div>
        </div>
    )
}
