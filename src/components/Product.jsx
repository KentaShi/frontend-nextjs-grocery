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
    Select,
    Option,
} from "@material-tailwind/react"

import { addNewProduct } from "@/service/product"
import toast from "react-hot-toast"
import ProductCard from "./ProductCard"
import ProductItem from "./ProductItem"
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
    const initProductData = {
        product_name: "",
        product_thumb: "",
        product_price: "",
        product_cate: "",
    }
    const [productData, setProductData] = useState(initProductData)

    const { product_name, product_thumb, product_price, product_cate } =
        productData

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setProductData({ ...productData, [name]: value })
    }
    const handleChangeCategory = (e) => {
        setProductData({ ...productData, product_cate: e })
    }
    const handleOpenAddNew = () => {
        setProductData(initProductData)
        setOpenAddNew((prev) => !prev)
    }
    const handleAddNewProduct = async () => {
        // console.log(productData)
        const res = await addNewProduct(productData)
        if (res.status === 200) {
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
        setOpenAddNew((prev) => !prev)
        setProductData(initProductData)
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
                        <Fragment>
                            <Dialog
                                size="xs"
                                open={openAddNew}
                                handler={handleOpenAddNew}
                                className="bg-transparent shadow-none"
                                animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0.9, y: -100 },
                                }}
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
                                        <Input
                                            name="product_name"
                                            value={product_name}
                                            onChange={handleChangeInput}
                                            label="Tên sản phẩm"
                                            size="lg"
                                        />
                                        <Typography
                                            className="-mb-2"
                                            variant="h6"
                                        >
                                            Giá Tiền
                                        </Typography>
                                        <Input
                                            name="product_price"
                                            value={product_price}
                                            onChange={handleChangeInput}
                                            label="Giá tiền"
                                            size="lg"
                                        />
                                        <Typography
                                            className="-mb-2"
                                            variant="h6"
                                        >
                                            Phân Loại
                                        </Typography>
                                        <Select
                                            name="product_cate"
                                            onChange={handleChangeCategory}
                                            value={product_cate}
                                            label="Phân Loại"
                                        >
                                            <Option value="coffee">
                                                Cà Phê
                                            </Option>
                                            <Option value="drink">
                                                Nước Ngọt
                                            </Option>
                                            <Option value="vegetable">
                                                Rau Củ
                                            </Option>
                                        </Select>
                                        <Typography
                                            className="-mb-2"
                                            variant="h6"
                                        >
                                            Hình Ảnh
                                        </Typography>
                                        <Input
                                            name="product_thumb"
                                            value={product_thumb}
                                            onChange={handleChangeInput}
                                            label="Hình Ảnh"
                                            size="lg"
                                        />
                                    </CardBody>
                                    <CardFooter className="flex flex-row  pt-0">
                                        <Button
                                            onClick={handleOpenAddNew}
                                            className="mr-2"
                                            color="red"
                                            variant="gradient"
                                            fullWidth
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            onClick={handleAddNewProduct}
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
