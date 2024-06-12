import { errorMessages } from "@/constants"
import { useAuth } from "@/contexts/auth/providerAuth"
import { CATE_ACTIONS } from "@/contexts/category/actionCate"
import { useCateContext } from "@/contexts/category/providerCate"
import { deleteCategory } from "@/service/category"
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

const CategoryDeleteFragment = ({ category, openDialog, handleOpenDialog }) => {
    const { dispatch } = useCateContext()
    const { state } = useAuth()
    const { accessToken } = state

    const { _id, cate_name } = category
    const handleDeleteCategory = async () => {
        const refreshToken = Cookies.get("refresh_token")
        const res = await deleteCategory({
            cate_id: _id,
            tokens: { accessToken, refreshToken },
        })
        if (res.statusCode === 200) {
            dispatch({
                type: CATE_ACTIONS.DELETE,
                payload: { _id },
            })
            toast.success(res.message)
        } else if (res.statusCode === 400) {
            toast.error("Có sản phầm thuộc phân loại này, không thể xóa!")
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
                        <Typography variant="paragraph" color="blue-gray">
                            Xóa phân loại{" "}
                            <span className="font-bold text-lg">
                                {cate_name}
                            </span>
                            ?
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
                            onClick={handleDeleteCategory}
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

export default CategoryDeleteFragment
