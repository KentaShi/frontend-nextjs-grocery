import StickyNavbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"
import React from "react"

const HomeLayout = ({ children }) => {
    return (
        <main className="relative mb-8 h-screen w-full">
            <div className="sticky top-0 z-[999] flex w-full items-center">
                <StickyNavbar />
            </div>
            <div className="px-3">
                <div className="container mx-auto flex">
                    <div className="mt-6 w-full flex justify-center">
                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="w-full">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default HomeLayout
