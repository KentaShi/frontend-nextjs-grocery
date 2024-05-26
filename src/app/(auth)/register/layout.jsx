import React from "react"

export const metadata = {
    title: "Register",
    description: "Register a new account",
}

const RegisterLayout = ({ children }) => {
    return (
        <div className="flex h-screen w-full justify-center items-center">
            {children}
        </div>
    )
}

export default RegisterLayout
