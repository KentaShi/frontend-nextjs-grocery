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
import { login } from "@/service/access"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth/state"
import { ACTIONS } from "@/contexts/auth/action"
import toast from "react-hot-toast"
import Cookies from "js-cookie"
const LoginPage = () => {
    const router = useRouter()
    const { dispatch } = useAuth()
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

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        const res = await login(loginData)

        const metadata = res.metadata
        console.log("res login: ", metadata)
        if (res.status === 200) {
            dispatch({
                type: ACTIONS.LOGIN,
                payload: { user: metadata.user, tokens: metadata.tokens },
            })
            Cookies.set("access_token", metadata.tokens.accessToken, {
                expires: 7,
                secure: true,
            })
            Cookies.set("refresh_token", metadata.tokens.refreshToken, {
                expires: 7,
                secure: true,
            })
            toast.success(res.message)
            router.push("/profile")
        }
        if (res.status === 401) {
            toast.error(res.message)
        }
        if (res.status === 404) {
            toast.error(res.message)
        }
        setLoginData(initState)
    }
    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Log In
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
