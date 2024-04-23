import { updateProduct } from "@/service/product"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    Dialog,
    IconButton,
    Input,
    Option,
    Select,
    Tooltip,
    Typography,
} from "@material-tailwind/react"
import React, { Fragment, useState } from "react"
import toast from "react-hot-toast"

const ProductUpdateFragment = ({ product, openDialog, handleOpenDialog }) => {
    const [productData, setProductData] = useState(product)
    const { _id, product_name, product_thumb, product_price, product_cate } =
        productData

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setProductData({ ...productData, [name]: value })
    }
    const handleChangeCategory = (e) => {
        setProductData({ ...productData, product_cate: e })
    }
    const handleUpdateProduct = async () => {
        const res = await updateProduct(_id, productData)
        if (res.status === 200) {
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
        handleOpenDialog()
    }
    return (
        <Fragment>
            <Dialog
                size="xs"
                open={openDialog}
                handler={handleOpenDialog}
                className="bg-transparent shadow-none"
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Sửa Sản Phẩm
                        </Typography>

                        <Typography className="-mb-2" variant="h6">
                            Tên Sản Phẩm
                        </Typography>
                        <Input
                            name="product_name"
                            value={product_name}
                            onChange={handleChangeInput}
                            label="Tên sản phẩm"
                            size="lg"
                        />
                        <Typography className="-mb-2" variant="h6">
                            Giá Tiền
                        </Typography>
                        <Input
                            name="product_price"
                            value={product_price}
                            onChange={handleChangeInput}
                            label="Giá tiền"
                            size="lg"
                        />
                        <Typography className="-mb-2" variant="h6">
                            Phân Loại
                        </Typography>
                        <Select
                            name="product_cate"
                            onChange={handleChangeCategory}
                            value={product_cate}
                            label="Phân Loại"
                        >
                            <Option value="coffee">Cà Phê</Option>
                            <Option value="drink">Nước Các Loại</Option>
                        </Select>
                        <Typography className="-mb-2" variant="h6">
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
                            onClick={handleOpenDialog}
                            className="mr-2"
                            color="red"
                            variant="gradient"
                            fullWidth
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleUpdateProduct}
                            color="blue"
                            variant="gradient"
                            fullWidth
                        >
                            Lưu
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </Fragment>
    )
}

export default ProductUpdateFragment
