import React, { Fragment, useState } from "react"
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
import { addCategory } from "@/service/category"
import toast from "react-hot-toast"
import { useCateContext } from "@/contexts/category/providerCate"
import { CATE_ACTIONS } from "@/contexts/category/actionCate"
import { errorMessages } from "@/constants"
import Cookies from "js-cookie"
import { useAuth } from "@/contexts/auth/providerAuth"

const CategoryAddFragment = ({ openDialog, handleOpenDialog }) => {
    const { dispatch } = useCateContext()

    const { state } = useAuth()
    const { accessToken } = state

    const [cateName, setCateName] = useState("")

    const refreshToken = Cookies.get("refresh_token")

    const tokens = { accessToken, refreshToken }

    const handleAddNewCategory = async () => {
        const res = await addCategory({ data: { cate_name: cateName }, tokens })
        if (res.statusCode === 200) {
            dispatch({ type: CATE_ACTIONS.ADD, payload: res.metadata.category })
            toast.success(res.message)
        } else if (res.statusCode === 409) {
            toast.error("Đã có phân loại này")
        } else {
            toast.error(errorMessages.SERVER_ERROR.vi)
        }
        handleOpenDialog()
        setCateName("")
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
                            Thêm Phân Loại
                        </Typography>
                        <Input
                            name="product_name"
                            value={cateName}
                            onChange={(e) => setCateName(e.target.value)}
                            label="Tên phân loại"
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
                            onClick={handleAddNewCategory}
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

export default CategoryAddFragment
