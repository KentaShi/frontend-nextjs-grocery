import Loading from "@/components/Loading"
import dynamic from "next/dynamic"
import React from "react"
const Profile = dynamic(() => import("@/components/Profile"), {
    loading: () => <Loading />,
})

const page = () => {
    return (
        <>
            <Profile />
        </>
    )
}

export default page
