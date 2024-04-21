"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react"
import { useAuth } from "@/contexts/auth/state"
import { register } from "@/service/access"
import toast from "react-hot-toast"
const RegisterPage = () => {
    const { state } = useAuth()
    const { user } = state
    const initState = {
        username: "",
        password: "",
        confirmPassword: "",
    }
    const [registerData, setRegisterData] = useState(initState)
    const { username, password, confirmPassword } = registerData

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setRegisterData({ ...registerData, [name]: value })
    }

    const handleSubmitRegister = async (e) => {
        console.log(registerData)
        const res = await register(registerData)
        if (res.status === 200) {
            toast.success(res.message)
            redirect("/login")
        } else {
            toast.error(res.message)
        }
        setRegisterData(initState)
    }

    useEffect(() => {
        if (user) {
            redirect("/")
        }
    }, [user])
    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
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
                        name="username"
                        value={username}
                        onChange={handleChangeInput}
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
                        name="password"
                        value={password}
                        onChange={handleChangeInput}
                        type="password"
                        size="lg"
                        placeholder="********"
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
                        Confirm Password
                    </Typography>
                    <Input
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChangeInput}
                        type="password"
                        size="lg"
                        placeholder="********"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                </div>
                <Button
                    onClick={handleSubmitRegister}
                    className="mt-6"
                    fullWidth
                >
                    sign up
                </Button>
                <Typography
                    color="gray"
                    className="mt-4 text-center font-normal"
                >
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-gray-900">
                        Sign In
                    </Link>
                </Typography>
            </form>
        </Card>
    )
}

export default RegisterPage
