import React, { Fragment, useState } from "react"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
    Dialog,
} from "@material-tailwind/react"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { deleteProduct } from "@/service/product"
import toast from "react-hot-toast"
import ProductUpdatePage from "./fragments/ProductUpdateFragment"

const ProductCard = ({ product }) => {
    const { _id, product_name, product_thumb, product_price, product_cate } =
        product

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog((p) => !p)
    }
    const handleOpenUpdateDialog = () => {
        setOpenUpdateDialog((p) => !p)
    }
    const handleDeleteProduct = async () => {
        const res = await deleteProduct(_id)
        if (res.status === 200) {
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
        setOpenDeleteDialog((p) => !p)
    }
    return (
        <Card className="m-0 w-44 sm:w-72 lg:w-96">
            <CardHeader
                shadow={false}
                floated={false}
                className="h-44 sm:h-72 lg:h-96"
            >
                <img
                    src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody className="p-2">
                <div className="flex flex-col items-center justify-between">
                    <Typography
                        color="blue-gray"
                        className="font-normal text-sm"
                    >
                        {product_name}
                    </Typography>
                    <Typography color="red" className="font-medium text-base">
                        {product_price}đ
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="p-0">
                <div className="flex flex-row justify-around items-center">
                    <Tooltip content="Sửa sản phẩm">
                        <IconButton
                            onClick={handleOpenUpdateDialog}
                            variant="text"
                        >
                            <PencilIcon className="h-4 w-4" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip content="Xóa sản phẩm">
                        <IconButton
                            onClick={handleOpenDeleteDialog}
                            color="red"
                            variant="text"
                        >
                            <TrashIcon className="h-4 w-4" />
                        </IconButton>
                    </Tooltip>
                    <ProductUpdatePage
                        product={product}
                        openDialog={openUpdateDialog}
                        handleOpenDialog={handleOpenUpdateDialog}
                    />
                    <Fragment>
                        <Dialog
                            size="xs"
                            open={openDeleteDialog}
                            handler={handleOpenDeleteDialog}
                            className="bg-transparent shadow-none"
                            animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0.9, y: -100 },
                            }}
                        >
                            <Card className="mx-auto w-full max-w-[24rem]">
                                <CardBody className="flex flex-col gap-4">
                                    <Typography
                                        variant="paragraph"
                                        color="blue-gray"
                                    >
                                        Xóa Sản Phẩm
                                    </Typography>

                                    <Typography className="-mb-2" variant="h6">
                                        {product_name}
                                    </Typography>
                                </CardBody>
                                <CardFooter className="flex flex-row  pt-0">
                                    <Button
                                        onClick={handleOpenDeleteDialog}
                                        className="mr-2"
                                        color="red"
                                        variant="gradient"
                                        fullWidth
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        onClick={handleDeleteProduct}
                                        color="blue"
                                        variant="gradient"
                                        fullWidth
                                    >
                                        Xóa
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Dialog>
                    </Fragment>
                </div>
            </CardFooter>
        </Card>
    )
}

export default ProductCard
