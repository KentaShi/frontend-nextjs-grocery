"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react"
import { login } from "@/service/access"
import { redirect, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth/providerAuth"
import { AUTH_ACTIONS } from "@/contexts/auth/actionAuth"
import toast from "react-hot-toast"
import Cookies from "js-cookie"
import { errorMessages } from "@/constants"
const LoginPage = () => {
    const router = useRouter()
    const { state, dispatch } = useAuth()
    const { user } = state
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

        if (res.statusCode === 200) {
            const metadata = res.metadata
            dispatch({
                type: AUTH_ACTIONS.AUTH,
                payload: {
                    user: metadata.user,
                    accessToken: metadata.tokens.accessToken,
                },
            })
            Cookies.set("refresh_token", metadata.tokens.refreshToken, {
                expires: 30,
                secure: true,
            })
            router.push("/")
            toast.success("Welcome to Tạp Hóa Chị Tuyết")
        } else if (res.statusCode === 400) {
            toast.error(errorMessages.LOGIN_FAILED.vi)
        } else if (res.statusCode === 403) {
            toast.error(res.message)
        } else {
            toast.error(errorMessages.SERVER_ERROR.vi)
        }

        setLoginData(initState)
    }
    useEffect(() => {
        if (user) {
            return redirect("/")
        }
    }, [user])
    return (
        <Card className="bg-dark-3 p-5" shadow={false}>
            <Typography
                className="flex items-center justify-center"
                variant="h4"
                color="white"
            >
                Log In
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Input
                        color="white"
                        value={username}
                        onChange={handleChangeInput}
                        name="username"
                        size="lg"
                        label="Username"
                    />

                    <Input
                        color="white"
                        value={password}
                        onChange={handleChangeInput}
                        name="password"
                        type="password"
                        size="lg"
                        label="Password"
                    />
                </div>
                <Button onClick={handleSubmitLogin} className="mt-6" fullWidth>
                    login
                </Button>
                <Typography
                    color="white"
                    className="mt-4 text-center font-normal"
                >
                    Don't have account?{" "}
                    <Link
                        className="font-medium text-blue-1"
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
