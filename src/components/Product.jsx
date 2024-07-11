"use client"
import React, { useEffect, useState } from "react"

import { PlusIcon } from "@heroicons/react/24/solid"
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    IconButton,
} from "@material-tailwind/react"

import ProductItem from "./ProductItem"
import ProductAddFragment from "./fragments/ProductAddFragment"
import Pagination from "./Pagination"
import { useProductContext } from "@/contexts/product/providerProductV2"
const TABLE_HEAD = ["Tên sản phẩm", "Giá", "Phân loại", "Tùy chọn"]

const Product = () => {
    const [openAddNew, setOpenAddNew] = useState(false)

    const { products, currentPage, setCurrentPage, totalPages } =
        useProductContext()

    const handleOpenAddNew = () => {
        setOpenAddNew((prev) => !prev)
    }

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
                            Danh sách sản phẩm
                        </Typography>
                        <Typography
                            color="white"
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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </Card>
    )
}

export default Product
