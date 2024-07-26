"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Collapse,
    Card,
} from "@material-tailwind/react"
import { useAuth } from "@/contexts/auth/providerAuth"
import { useLogout } from "@/hooks/useLogout"
import {
    ArrowRightStartOnRectangleIcon,
    HomeIcon,
} from "@heroicons/react/24/solid"
import SearchBar from "./SearchBar"
export default function StickyNavbar() {
    const logout = useLogout()
    const { state, dispatch } = useAuth()
    const { isAuthenticated, user, accessToken } = state

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="paragraph"
                color="white"
                className="p-1 text-sm font-bold hover:text-green-light"
            >
                <Link href="/profile" className="flex items-center">
                    Profile
                </Link>
            </Typography>
        </ul>
    )

    return (
        <nav className="w-full rounded-none bg-green-3 py-1.5 lg:px-8 lg:py-4 px-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Link
                        href={"/"}
                        className="flex items-center justify-center"
                    >
                        <span className="text-base lg:text-2xl font-semibold text-green-light text-outline hidden lg:block">
                            Tạp Hóa Chị Tuyết
                        </span>
                        <HomeIcon className="w-8 h-8 text-green-light lg:hidden mr-2" />
                    </Link>

                    <div className="w-full max-w-[618px]">
                        <SearchBar />
                    </div>

                    <div className="flex items-center">
                        {isAuthenticated ? (
                            <>
                                <div className="hidden lg:block">{navList}</div>
                                <div className="hidden lg:block">
                                    <ArrowRightStartOnRectangleIcon
                                        color="white"
                                        onClick={logout}
                                        className="w-6 h-6 hover:text-green-light font-bold cursor-pointer"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center">
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    className="hidden lg:inline-block"
                                >
                                    <Link href="/login">Log in</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
