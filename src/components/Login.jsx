"use client"
import { errorMessages } from "@/constants"
import { AUTH_ACTIONS } from "@/contexts/auth/actionAuth"
import { useAuth } from "@/contexts/auth/providerAuth"
import { login } from "@/service/access"
import { Button, Card, Input, Typography } from "@material-tailwind/react"
import Cookies from "js-cookie"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

const Login = () => {
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
        <>
            <Card
                className="bg-white/80 brightness-110 p-8 rounded-2xl flex items-center  drop-shadow-xl"
                shadow={true}
            >
                <div className="bg-blue-gray-300/50 w-40 rounded-full p-3">
                    <p className="py-3 flex justify-center items-center bg-white rounded-full text-sm font-bold shadow-lg">
                        Login
                    </p>
                </div>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Input
                            color="black"
                            value={username}
                            onChange={handleChangeInput}
                            name="username"
                            size="lg"
                            label="Username"
                        />

                        <Input
                            color="black"
                            value={password}
                            onChange={handleChangeInput}
                            name="password"
                            type="password"
                            size="lg"
                            label="Password"
                        />
                    </div>
                    <Button
                        onClick={handleSubmitLogin}
                        className="mt-6 bg-green-1 hover:bg-green-light"
                        fullWidth
                    >
                        login
                    </Button>
                    <Typography
                        color="blue-gray"
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
        </>
    )
}

export default Login
