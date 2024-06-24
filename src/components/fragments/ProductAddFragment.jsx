import { errorMessages } from "@/constants"
import { useAuth } from "@/contexts/auth/providerAuth"
import { useCateContext } from "@/contexts/category/providerCate"
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
import Cookies from "js-cookie"
import React, { Fragment, useEffect, useState } from "react"
import toast from "react-hot-toast"

const ProductAddFragment = ({ openDialog, handleOpenDialog }) => {
    const { dispatch } = useProductContext()
    const { state } = useAuth()
    const { accessToken } = state
    const refreshToken = Cookies.get("refresh_token")
    const tokens = {
        accessToken,
        refreshToken,
    }

    const { state: cateState } = useCateContext()
    const { categories } = cateState

    const initProductData = {
        product_name: "",
        product_thumb: { url: "", public_id: "" },
        product_price: "",
        product_unit: "",
        product_cate: "",
    }
    const [productData, setProductData] = useState(initProductData)
    const [file, setFile] = useState(null)

    const [isUploading, setIsUploading] = useState(false)

    const {
        product_name,
        product_thumb,
        product_price,
        product_unit,
        product_cate,
    } = productData

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
    const handleUpload = async () => {
        setIsUploading(true)
        const uploadData = new FormData()
        uploadData.append("file", file)

        const resImg = await cloudinaryUpload(uploadData)
        setProductData({
            ...productData,
            product_thumb: {
                url: resImg.metadata.url,
                public_id: resImg.metadata.public_id,
            },
        })

        setIsUploading(false)
    }
    const handleAddNewProduct = async () => {
        const formData = new FormData()
        formData.append("product_name", productData.product_name)
        formData.append("product_price", productData.product_price)
        formData.append("product_unit", productData.product_unit)
        formData.append("product_cate", productData.product_cate)
        formData.append("file", file)

        try {
            const res = await addNewProduct(formData, tokens)
            if (res.statusCode === 200) {
                dispatch({
                    type: PRODUCT_ACTIONS.ADD,
                    payload: res.metadata.product,
                })
                toast.success(res.message)
            } else if (res.statusCode === 400) {
                toast.error(res.message)
            } else {
                toast.error(errorMessages.SERVER_ERROR.vi)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(errorMessages.SERVER_ERROR.vi)
        }

        // const res = await addNewProduct(productData, tokens)
        // if (res.statusCode === 200) {
        //     dispatch({
        //         type: PRODUCT_ACTIONS.ADD,
        //         payload: res.metadata.product,
        //     })
        //     toast.success(res.message)
        // } else if (res.statusCode === 400) {
        //     toast.error(res.message)
        // } else {
        //     toast.error(errorMessages.SERVER_ERROR.vi)
        // }

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

                        <Input
                            name="product_name"
                            value={product_name}
                            onChange={handleChangeInput}
                            label="Tên sản phẩm"
                            size="lg"
                        />

                        <Input
                            name="product_price"
                            value={product_price}
                            onChange={handleChangeInput}
                            label="Giá tiền"
                            size="lg"
                        />
                        <Input
                            name="product_unit"
                            value={product_unit}
                            onChange={handleChangeInput}
                            label="Đơn vị tính"
                            size="lg"
                        />

                        <Select
                            name="product_cate"
                            onChange={handleChangeCategory}
                            value={product_cate}
                            label="Phân Loại"
                        >
                            {categories.map((cate, index) => (
                                <Option key={index} value={cate.cate_slug}>
                                    {cate.cate_name}
                                </Option>
                            ))}

                            {/* <Option value="drink">Nước Ngọt</Option>
                            <Option value="vegetable">Rau Củ</Option> */}
                        </Select>
                        <Typography className="-mb-2" variant="h6">
                            Hình Ảnh
                        </Typography>
                        <div className="flex flex-row">
                            <Input
                                type="file"
                                name="product_thumb"
                                onChange={handleFileChange}
                                label="Hình Ảnh"
                                size="lg"
                            />
                            <Button
                                disabled={file === null}
                                onClick={handleUpload}
                            >
                                Ok
                            </Button>
                        </div>
                        {productData.product_thumb !== "" && (
                            <img
                                className="rounded-lg object-cover object-center"
                                src={productData.product_thumb.url}
                                alt={productData.product_name}
                            />
                        )}
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
                            className="flex justify-center items-center"
                            disabled={productData.product_thumb === ""}
                        >
                            {isUploading ? (
                                <svg
                                    aria-hidden="true"
                                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                            ) : (
                                "Thêm"
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </Fragment>
    )
}

export default ProductAddFragment
