"use client"
import React, { Fragment, useState } from "react"

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
    Dialog,
    Checkbox,
} from "@material-tailwind/react"
const TABLE_HEAD = ["Tên sản phẩm", "Giá", "Phân loại", "Tùy chọn"]

const TABLE_ROWS = [
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
        name: "Spotify",
        amount: "$2,500",
        category: "Wed 3:00pm",
    },
]
const Product = ({ message }) => {
    // console.log(message)
    const [openAddNew, setOpenAddNew] = useState(false)
    const handleOpenAddNew = () => {
        setOpenAddNew((prev) => !prev)
    }
    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Danh sách sản phẩm
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Số lượng
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={
                                    <MagnifyingGlassIcon className="h-5 w-5" />
                                }
                            />
                        </div>
                        <Button
                            onClick={handleOpenAddNew}
                            className="flex items-center gap-3"
                            size="sm"
                        >
                            <PlusIcon strokeWidth={2} className="h-4 w-4" />{" "}
                            Thêm sản phẩm
                        </Button>
                        <Fragment>
                            <Dialog
                                size="xs"
                                open={openAddNew}
                                handler={handleOpenAddNew}
                                className="bg-transparent shadow-none"
                            >
                                <Card className="mx-auto w-full max-w-[24rem]">
                                    <CardBody className="flex flex-col gap-4">
                                        <Typography
                                            variant="h4"
                                            color="blue-gray"
                                        >
                                            Thêm Sản Phẩm
                                        </Typography>

                                        <Typography
                                            className="-mb-2"
                                            variant="h6"
                                        >
                                            Tên Sản Phẩm
                                        </Typography>
                                        <Input label="Tên sản phẩm" size="lg" />
                                        <Typography
                                            className="-mb-2"
                                            variant="h6"
                                        >
                                            Giá Tiền
                                        </Typography>
                                        <Input label="Giá tiền" size="lg" />
                                        <Typography
                                            className="-mb-2"
                                            variant="h6"
                                        >
                                            Phân Loại
                                        </Typography>
                                        <Input label="Phân Loại" size="lg" />
                                    </CardBody>
                                    <CardFooter className="flex flex-row  pt-0">
                                        <Button
                                            className="mr-2"
                                            color="red"
                                            variant="gradient"
                                            fullWidth
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            color="blue"
                                            variant="gradient"
                                            fullWidth
                                        >
                                            Thêm
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Dialog>
                        </Fragment>
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
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(
                            ({ img, name, amount, category }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50"

                                return (
                                    <tr key={name}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src={img}
                                                    alt={name}
                                                    size="md"
                                                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                />
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {name}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {amount}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {category}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Tooltip content="Sửa sản phẩm">
                                                <IconButton variant="text">
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip content="Xóa sản phẩm">
                                                <IconButton
                                                    color="red"
                                                    variant="text"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Button variant="outlined" size="sm">
                    Previous
                </Button>
                <div className="flex items-center gap-2">
                    <IconButton variant="outlined" size="sm">
                        1
                    </IconButton>
                    <IconButton variant="text" size="sm">
                        2
                    </IconButton>
                    <IconButton variant="text" size="sm">
                        3
                    </IconButton>
                    <IconButton variant="text" size="sm">
                        ...
                    </IconButton>
                    <IconButton variant="text" size="sm">
                        8
                    </IconButton>
                    <IconButton variant="text" size="sm">
                        9
                    </IconButton>
                    <IconButton variant="text" size="sm">
                        10
                    </IconButton>
                </div>
                <Button variant="outlined" size="sm">
                    Next
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Product
