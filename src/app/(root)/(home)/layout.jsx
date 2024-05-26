import StickyNavbar from "@/components/Navbar"
import React from "react"

const HomeLayout = ({ children }) => {
    return (
        <main className="relative mb-8 h-full w-full">
            <div className="sticky top-0 z-[999] flex w-full items-center">
                <StickyNavbar />
            </div>
            <div className="px-6">
                <div className="container mx-auto flex">
                    <div className="mt-6 w-full flex justify-center">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default HomeLayout
