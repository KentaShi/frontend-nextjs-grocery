import { useAuth } from "@/contexts/auth/providerAuth"
import { PRODUCT_ACTIONS } from "@/contexts/product/actionProduct"
import { useProductContext } from "@/contexts/product/providerProduct"
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
import React, { Fragment, useEffect, useState } from "react"
import toast from "react-hot-toast"
import Cookies from "js-cookie"
import { errorMessages } from "@/constants"
import { useCateContext } from "@/contexts/category/providerCate"
import { useLogout } from "@/hooks/useLogout"

const ProductUpdateFragment = ({
    product,
    openDialog,
    handleOpenDialog,
    onlyUpdatePrice,
}) => {
    const logout = useLogout()
    const { state } = useAuth()
    const { accessToken } = state

    const { state: cateState } = useCateContext()
    const { categories } = cateState

    const { dispatch } = useProductContext()
    const [productData, setProductData] = useState(product)
    const {
        _id,
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
    const handleUpdateProduct = async () => {
        const refreshToken = Cookies.get("refresh_token")
        const tokens = { accessToken, refreshToken }
        const res = await updateProduct({ id: _id, data: productData, tokens })
        if (res.statusCode === 200) {
            dispatch({
                type: PRODUCT_ACTIONS.UPDATE,
                payload: productData,
            })
            toast.success(res.message)
        } else if (res.statusCode === 403) {
            toast.error(errorMessages.FORBIDDEN.vi)
            logout()
        } else {
            toast.error(errorMessages.SERVER_ERROR.vi)
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
                        {onlyUpdatePrice ? (
                            <>
                                <Typography variant="h4" color="blue-gray">
                                    Cập Nhật Giá
                                </Typography>
                                <Typography className="-mb-2" variant="h6">
                                    Giá Mới
                                </Typography>
                                <Input
                                    name="product_price"
                                    value={product_price}
                                    onChange={handleChangeInput}
                                    label="Giá tiền"
                                    size="lg"
                                />
                            </>
                        ) : (
                            <>
                                <Typography variant="h4" color="blue-gray">
                                    Cập Nhật Sản Phẩm
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
                                        <Option
                                            key={index}
                                            value={cate.cate_slug}
                                        >
                                            {cate.cate_name}
                                        </Option>
                                    ))}
                                </Select>
                            </>
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
