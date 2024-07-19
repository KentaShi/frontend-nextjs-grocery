"use client"
import { Button } from "@material-tailwind/react"
import Link from "next/link"
import React from "react"

const AdminNavbar = () => {
    return (
        <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
            <Link href={"/"} className="flex items-center gap-1">
                <p className="text-[26px] font-extrabold text-white max-sm:hidden">
                    Home
                </p>
            </Link>
            <div className="flex-between gap-5">
                <Button variant="gradient" size="sm" className="">
                    Log Out
                </Button>
            </div>
        </nav>
    )
}

export default AdminNavbar
