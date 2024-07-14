"use client"
import { useAuth } from "@/contexts/auth/providerAuth"
import { register } from "@/service/access"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Card, Input, Button, Typography } from "@material-tailwind/react"
import { errorMessages } from "@/constants"

const Register = () => {
    const router = useRouter()
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
        if (res.statusCode === 200) {
            toast.success(res.message)
            router.push("/login")
        } else if (res.statusCode === 409) {
            toast.error(errorMessages.CONFLICTS_USERNAME.vi)
        } else if (res.statusCode === 400) {
            toast.error(res.message)
        } else {
            toast.error(errorMessages.SERVER_ERROR.vi)
        }
        setRegisterData(initState)
    }

    useEffect(() => {
        if (user) {
            router.push("/")
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
                        Register
                    </p>
                </div>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Input
                            color="black"
                            name="username"
                            value={username}
                            onChange={handleChangeInput}
                            size="lg"
                            label="Username"
                        />

                        <Input
                            color="black"
                            name="password"
                            value={password}
                            onChange={handleChangeInput}
                            type="password"
                            size="lg"
                            label="Password"
                        />

                        <Input
                            color="black"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChangeInput}
                            type="password"
                            size="lg"
                            label="Confirm Password"
                        />
                    </div>
                    <Button
                        onClick={handleSubmitRegister}
                        className="mt-6 bg-green-1 hover:bg-green-light"
                        fullWidth
                    >
                        Register
                    </Button>
                    <Typography
                        color="blue-gray"
                        className="mt-4 text-center font-normal"
                    >
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-blue-1">
                            Login
                        </Link>
                    </Typography>
                </form>
            </Card>
        </>
    )
}

export default Register
