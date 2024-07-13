import { PlusIcon } from "@heroicons/react/24/solid"
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react"
import React, { useState } from "react"
import UserItem from "./UserItem"
import { getCurrentRecords } from "@/utils/pagination"
import Pagination from "./Pagination"

const TABLE_HEAD = ["Username", "Role", "Status", "Options"]

const User = ({ users }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const userPerPage = 5
    const totalPages = Math.ceil(users.length / userPerPage)

    const currentUsers = getCurrentRecords(currentPage, userPerPage, users)
    return (
        <Card className="bg-dark-3 h-full w-full">
            <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none bg-dark-3"
            >
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h6" color="white">
                            Danh sách User
                        </Typography>
                        <Typography
                            color="white"
                            variant="paragraph"
                            className="mt-1 font-normal"
                        >
                            Số lượng: {users.length}
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <Button
                            className="flex items-center"
                            size="sm"
                            color="deep-orange"
                        >
                            <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                            User
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100  p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="white"
                                        className="text-base font-bold leading-none "
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, index) => {
                            const isLast = index === user.length - 1
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50"

                            return (
                                <UserItem
                                    key={index}
                                    user={user}
                                    classes={classes}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </CardBody>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </Card>
    )
}

export default User
