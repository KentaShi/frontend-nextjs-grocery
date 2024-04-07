import React from "react"

export const metadata = {
    title: "Register",
    description: "Register a new account",
}

const RegisterLayout = ({ children }) => {
    return (
        <div className="flex justify-center items-center py-6 rounded">
            {children}
        </div>
    )
}

export default RegisterLayout
