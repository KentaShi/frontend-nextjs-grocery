import React from "react"

export const metadata = {
    title: "Login",
    description: "Login to your account",
}

const LayoutLogin = ({ children }) => {
    return (
        <div className="flex justify-center w-full items-center py-6 rounded">
            {children}
        </div>
    )
}

export default LayoutLogin
