"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react"
const LoginPage = () => {
    const initState = {
        username: "",
        password: "",
    }
    const [loginData, setLoginData] = useState(initState)
    const { username, password } = loginData

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        console.log(loginData)
        setLoginData(initState)
    }
    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Login
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to Login.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                    >
                        Username
                    </Typography>
                    <Input
                        value={username}
                        onChange={handleChangeInput}
                        name="username"
                        size="lg"
                        placeholder="username"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                    >
                        Password
                    </Typography>
                    <Input
                        value={password}
                        onChange={handleChangeInput}
                        name="password"
                        type="password"
                        size="lg"
                        placeholder="********"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                </div>
                <Button onClick={handleSubmitLogin} className="mt-6" fullWidth>
                    login
                </Button>
                <Typography
                    color="gray"
                    className="mt-4 text-center font-normal"
                >
                    Don't have account?{" "}
                    <Link
                        className="font-medium text-gray-900"
                        href={"/register"}
                    >
                        Register
                    </Link>
                </Typography>
            </form>
        </Card>
    )
}

export default LoginPage
