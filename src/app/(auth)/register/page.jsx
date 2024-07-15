import React from "react"
import Register from "@/components/Register"
import { description, title } from "@/constants"

export const metadata = {
    title: title.REGISTER.vi,
    description: description.REGISTER.vi,
}

const RegisterPage = () => {
    return (
        <>
            <Register />
        </>
    )
}

export default RegisterPage
