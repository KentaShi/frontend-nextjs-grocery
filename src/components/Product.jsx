"use client"
import React, { useState } from "react"

import { PlusIcon } from "@heroicons/react/24/solid"
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
} from "@material-tailwind/react"

import ProductItem from "./ProductItem"
import ProductAddFragment from "./fragments/ProductAddFragment"
const TABLE_HEAD = ["Tên sản phẩm", "Giá", "Phân loại", "Tùy chọn"]

const TABLE_ROWS = [
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
        name: "Spotify",
        amount: "$2,500",
        category: "Wed 3:00pm",
    },
]
const Product = ({ products }) => {
    const [openAddNew, setOpenAddNew] = useState(false)

    const handleOpenAddNew = () => {
        setOpenAddNew((prev) => !prev)
    }

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h6" color="blue-gray">
                            Danh sách sản phẩm
                        </Typography>
                        <Typography
                            color="gray"
                            variant="paragraph"
                            className="mt-1 font-normal"
                        >
                            Số lượng: {products?.length ? products.length : 0}
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <Button
                            onClick={handleOpenAddNew}
                            className="flex items-center"
                            size="sm"
                            color="deep-orange"
                        >
                            <PlusIcon strokeWidth={2} className="h-4 w-4" />{" "}
                            Thêm Sản Phẩm
                        </Button>
                        <ProductAddFragment
                            openDialog={openAddNew}
                            handleOpenDialog={handleOpenAddNew}
                        />
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
                        {products.map((product, index) => {
                            const isLast = index === products.length - 1
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50"

                            return (
                                <ProductItem
                                    key={index}
                                    product={product}
                                    classes={classes}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </CardBody>

            {/* <CardBody className="overflow-scroll px-0 grid grid-cols-2">
                {products?.length > 0 &&
                    products.map((product, index) => {
                        return <ProductCard key={index} product={product} />
                    })}
            </CardBody> */}
            {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
            </CardFooter> */}
        </Card>
    )
}

export default Product
