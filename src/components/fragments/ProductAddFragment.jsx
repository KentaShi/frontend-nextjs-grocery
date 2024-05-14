import { PRODUCT_ACTIONS } from "@/contexts/product/actionProduct"
import { useProductContext } from "@/contexts/product/providerProduct"
import { addNewProduct } from "@/service/product"
import { cloudinaryUpload } from "@/service/upload"
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Dialog,
    Input,
    Option,
    Select,
    Typography,
} from "@material-tailwind/react"
import React, { Fragment, useEffect, useState } from "react"
import toast from "react-hot-toast"

const ProductAddFragment = ({ openDialog, handleOpenDialog }) => {
    const { dispatch } = useProductContext()
    const initProductData = {
        product_name: "",
        product_thumb: "",
        product_price: "",
        product_cate: "",
    }
    const [productData, setProductData] = useState(initProductData)
    const [file, setFile] = useState(null)

    const { product_name, product_thumb, product_price, product_cate } =
        productData

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setProductData({ ...productData, [name]: value })
    }
    const handleChangeCategory = (e) => {
        setProductData({ ...productData, product_cate: e })
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }
    const handleAddNewProduct = async () => {
        // console.log(productData)
        console.log(productData)
        const uploadData = new FormData()
        uploadData.append("file", file)

        const resImg = await cloudinaryUpload(uploadData)
        if (resImg.status === 200) {
            setProductData({
                ...productData,
                product_thumb: resImg.response.thumb_url,
            })

            console.log(productData)

            const res = await addNewProduct(productData)
            if (res.status === 200) {
                dispatch({
                    type: PRODUCT_ACTIONS.ADD,
                    payload: res.metadata.product,
                })
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
        } else {
            toast.error(resImg.message)
        }

        handleOpenDialog()
        setProductData(initProductData)
    }
    useEffect(() => {
        setProductData(initProductData)
    }, [openDialog])
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
                            Thêm Sản Phẩm
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
                            <Option value="drink">Nước Ngọt</Option>
                            <Option value="vegetable">Rau Củ</Option>
                        </Select>
                        <Typography className="-mb-2" variant="h6">
                            Hình Ảnh
                        </Typography>
                        <Input
                            type="file"
                            name="product_thumb"
                            onChange={handleFileChange}
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
    )
}

export default ProductAddFragment
