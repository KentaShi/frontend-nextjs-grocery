"use client"
import React, { useEffect, useState } from "react"
import FilterProductFragment from "./fragments/FilterProductFragment"
import { Button, Input } from "@material-tailwind/react"
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

const SearchBar = () => {
    const pathName = usePathname()

    const router = useRouter()

    const [query, setQuery] = useState("")
    const [openDrawer, setOpenDrawer] = useState(false)

    const [placeholder, setPlaceholder] = useState("Bạn cần mua gì...")

    const handleOpenDrawer = (p) => {
        setOpenDrawer(p)
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            router.push(`/search?q=${query}`)
            setQuery("")
        }
    }

    useEffect(() => {
        if (pathName !== "/search") setQuery("")
    }, [pathName])

    return (
        <>
            <div className="flex items-center justify-center mr-2">
                <div className="relative flex w-full gap-2 my-2">
                    <Button
                        size="sm"
                        className="!absolute shadow-none hover:shadow-none bg-white left-1 border-r-2 top-1 z-10"
                        onClick={handleOpenDrawer}
                    >
                        <Bars3Icon className="text-green-2 w-4 h-4 " />
                    </Button>

                    <input
                        onKeyPress={handleKeyPress}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="search"
                        placeholder={placeholder}
                        onFocus={() =>
                            setPlaceholder("Nhập tên sản phẩm cần mua...")
                        }
                        onBlur={() => setPlaceholder("Bạn cần mua gì...")}
                        className="px-16 min-w-[288px] text-dark-2 bg-white rounded-lg w-full h-10 focus:outline"
                    />

                    <Link
                        onClick={() => setQuery("")}
                        href={`/search?q=${query}`}
                        className="!absolute right-1 top-1 rounded bg-green-2 py-2 px-4"
                    >
                        <MagnifyingGlassIcon className="w-4 h-4 text-white" />
                    </Link>
                </div>
            </div>
            <FilterProductFragment
                open={openDrawer}
                handleOpen={handleOpenDrawer}
            />
        </>
    )
}

export default SearchBar
