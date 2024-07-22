import { ArrowLongLeftIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import React from "react"

const LinkToHome = () => {
    return (
        <Link
            className="flex flex-row items-center my-2 hover:text-blue-500"
            href={"/"}
        >
            <ArrowLongLeftIcon className="w-6 h-6" />
            <p className="text-sm">Về trang chủ</p>
        </Link>
    )
}

export default LinkToHome
