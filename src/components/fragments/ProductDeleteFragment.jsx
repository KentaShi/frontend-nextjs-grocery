import { deleteProduct } from "@/service/product"
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Dialog,
    Typography,
} from "@material-tailwind/react"
import React, { Fragment } from "react"
import toast from "react-hot-toast"

const ProductDeleteFragment = ({ product, openDialog, handleOpenDialog }) => {
    const { _id, product_name } = product
    const handleDeleteProduct = async () => {
        const res = await deleteProduct(_id)
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
