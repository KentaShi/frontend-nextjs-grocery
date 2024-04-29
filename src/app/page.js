"use client"
import SearchProduct from "@/components/SearchProduct"
import { useAuth } from "@/contexts/auth/providerAuth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { IconButton } from "@material-tailwind/react"
import { ArrowPathIcon } from "@heroicons/react/24/solid"

export default function Home() {
    const { state } = useAuth()
    const { isAuthenticated } = state

    const router = useRouter()

    const handleRefreshPage = () => {}

    useEffect(() => {
        if (!isAuthenticated) return router.push("/login")
    }, [state])
    return (
        <div className="relative flex flex-col justify-center items-center">
            <div className="absolute bottom-0 right-0">
                <IconButton
                    onClick={handleRefreshPage}
                    size="lg"
                    className="rounded-full"
                    color="blue"
                >
                    <ArrowPathIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                </IconButton>
            </div>
            <div className="text-2xl font-bold mb-4">Welcome to Tap Hoa</div>
            <div>
                <SearchProduct />
            </div>
        </div>
    )
}
