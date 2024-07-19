import React from "react"

import Loading from "@/components/Loading"
import dynamic from "next/dynamic"

const ProductGrid = dynamic(() => import("@/components/ProductGrid"), {
    loading: () => <Loading />,
})

export default function Home() {
    return (
        <>
            <ProductGrid />
        </>
    )
}
