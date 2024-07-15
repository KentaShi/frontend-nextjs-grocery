import React from "react"

const AuthLayout = ({ children }) => {
    return (
        <div className="flex h-screen w-full justify-center items-center bg-hero bg-cover bg-center">
            {children}
        </div>
    )
}

export default AuthLayout
