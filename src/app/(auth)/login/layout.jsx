import React from "react"

export const metadata = {
    title: "Login",
    description: "Login to your account",
}

const LayoutLogin = ({ children }) => {
    return (
        <div className="flex h-screen w-full justify-center items-center">
            {children}
        </div>
    )
}

export default LayoutLogin
