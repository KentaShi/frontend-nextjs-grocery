import React from "react"

import Loading from "@/components/Loading"
import dynamic from "next/dynamic"
const ProductGrid = dynamic(() => import("@/components/ProductGrid"), {
    loading: () => <Loading />,
})

export default function Home() {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full">
                <ProductGrid />
            </div>
        </div>
    )
}
