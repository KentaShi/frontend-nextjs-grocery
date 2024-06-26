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
export default function StickyNavbar() {
    const logout = useLogout()
    const { state, dispatch } = useAuth()
    const { isAuthenticated, user, accessToken } = state

    const [openNav, setOpenNav] = useState(false)
    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        )
    }, [])

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {user?.roles === "admin" && (
                <Typography
                    as="li"
                    variant="paragraph"
                    color="white"
                    className="p-1 font-normal"
                >
                    <Link href="/dashboard" className="flex items-center">
                        Admin
                    </Link>
                </Typography>
            )}
            <Typography
                as="li"
                variant="paragraph"
                color="white"
                className="p-1 font-normal"
            >
                <Link href="/profile" className="flex items-center">
                    Profile
                </Link>
            </Typography>
        </ul>
    )

    return (
        <nav className="w-full mx-auto rounded-none bg-dark-1/90 py-1.5 lg:px-8 lg:py-4 px-6">
            <div className="container flex mx-auto items-center justify-between text-blue-gray-900">
                <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
                    <Link href={"/"}>
                        <span className="text-2xl font-bold text-white">
                            Home
                        </span>
                    </Link>
                </Typography>
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <div className="mr-4 hidden lg:block">
                                {navList}
                            </div>
                            <div className="flex items-center gap-x-1">
                                <Button
                                    onClick={logout}
                                    variant="gradient"
                                    size="sm"
                                    className="hidden lg:inline-block"
                                >
                                    Log Out
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-x-1">
                            <Button
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block"
                            >
                                <Link href="/login">Log in</Link>
                            </Button>
                        </div>
                    )}

                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>
            <Collapse open={openNav}>
                {isAuthenticated ? (
                    <>
                        {navList}
                        <div className="flex items-center gap-x-1">
                            <Button
                                onClick={logout}
                                fullWidth
                                variant="gradient"
                                size="sm"
                                className=""
                            >
                                Log Out
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-x-1">
                        <Button
                            fullWidth
                            variant="gradient"
                            size="sm"
                            className=""
                        >
                            <Link href="/login">Log in</Link>
                        </Button>
                    </div>
                )}
            </Collapse>
        </nav>
    )
}
