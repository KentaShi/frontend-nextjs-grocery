import {
    HomeIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    UserIcon,
} from "@heroicons/react/24/solid"
import Link from "next/link"
import React from "react"

const BottomNavbar = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-14">
            <div className="grid h-full grid-cols-4 max-w-lg mx-auto p-4">
                <Link href="/">
                    <p className="flex flex-col items-center">
                        <HomeIcon className="h-6 w-6 text-gray-600" />
                        <span className="text-xs text-gray-600">Home</span>
                    </p>
                </Link>
                <Link href="/search">
                    <p className="flex flex-col items-center">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
                        <span className="text-xs text-gray-600">Search</span>
                    </p>
                </Link>
                <Link href="/cart">
                    <p className="flex flex-col items-center">
                        <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
                        <span className="text-xs text-gray-600">Cart</span>
                    </p>
                </Link>
                <Link href="/profile">
                    <p className="flex flex-col items-center">
                        <UserIcon className="h-6 w-6 text-gray-600" />
                        <span className="text-xs text-gray-600">Profile</span>
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default BottomNavbar
