"use client"
import { useLogout } from "@/hooks/useLogout"
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
} from "@material-tailwind/react"
import React from "react"

const ProfilePage = () => {
    const logout = useLogout()
    return (
        <div className="flex flex-col justify-center items-center">
            <Card className="w-96">
                <CardHeader className="flex items-center justify-center">
                    <Avatar size="xl" src={""} alt={""} />
                </CardHeader>
                <CardBody>
                    <div className="divide-y divide-gray-200">
                        <div className="flex items-center justify-between pb-3 pt-3 last:pb-0">
                            <div className="flex items-center gap-x-3">
                                <div>
                                    <Typography color="blue-gray" variant="h6">
                                        Name
                                    </Typography>
                                    <Typography variant="small" color="gray">
                                        username
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter>
                    <Button>logout</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProfilePage
