import { useAuth } from "@/contexts/auth/providerAuth"
import { PRODUCT_ACTIONS } from "@/contexts/product/actionProduct"
import { useProductContext } from "@/contexts/product/providerProduct"
import { deleteProduct } from "@/service/product"
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Dialog,
    Typography,
} from "@material-tailwind/react"
import Cookies from "js-cookie"
import React, { Fragment } from "react"
import toast from "react-hot-toast"

const ProductDeleteFragment = ({ product, openDialog, handleOpenDialog }) => {
    const { dispatch } = useProductContext()
    const { state } = useAuth()
    const { accessToken } = state
    const { _id, product_name } = product
    const handleDeleteProduct = async () => {
        const refreshToken = Cookies.get("refresh_token")
        const res = await deleteProduct(_id, { accessToken, refreshToken })
        if (res.status === 200) {
            dispatch({
                type: PRODUCT_ACTIONS.DELETE,
                payload: { _id },
            })
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
                        <Typography variant="paragraph" color="blue-gray">
                            Xóa Sản Phẩm
                        </Typography>

                        <Typography className="-mb-2" variant="h6">
                            {product_name}
                        </Typography>
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
    )
}

export default ProductDeleteFragment
