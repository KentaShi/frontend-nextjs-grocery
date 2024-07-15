import React from "react"
import Login from "@/components/Login"
import { description, title } from "@/constants"

export const metadata = {
    title: title.LOGIN.vi,
    description: description.LOGIN.vi,
}

const LoginPage = () => {
    return (
        <>
            <Login />
        </>
    )
}

export default LoginPage
