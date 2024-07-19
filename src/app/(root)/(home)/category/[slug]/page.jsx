import CategoryDetail from "@/components/CategoryDetail"
import React from "react"

const Category = async ({ params }) => {
    return (
        <>
            <CategoryDetail slug={params.slug} />
        </>
    )
}

export default Category
