import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { IconButton, Tooltip, Typography } from "@material-tailwind/react"
import React, { useEffect, useState } from "react"
import CategoryDeleteFragment from "./fragments/CategoryDeleteFragment"
import { getCountOfProducts } from "@/service/category"
import Cookies from "js-cookie"
import { useAuth } from "@/contexts/auth/providerAuth"
import toast from "react-hot-toast"
import { errorMessages } from "@/constants"
import { useRouter } from "next/navigation"

const CategoryItem = ({ category, classes }) => {
    const { state } = useAuth()
    const { accessToken } = state

    const router = useRouter()

    const { cate_name, cate_slug } = category
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [countOfProducts, setCountOfProducts] = useState(0)

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog((p) => !p)
    }

    useEffect(() => {
        const fetchData = async () => {
            const refreshToken = Cookies.get("refresh_token")
            const res = await getCountOfProducts({
                cate_slug,
                tokens: { accessToken, refreshToken },
            })
            if (res.statusCode === 200) {
                setCountOfProducts(res.metadata.count)
            } else if (res.statusCode === 403) {
                router.push("/login")
                toast.error(errorMessages.FORBIDDEN.vi)
            }
        }
        fetchData()
    }, [category])
    return (
        <tr>
            <td className={classes}>
                <Typography variant="small" color="white" className="font-bold">
                    {cate_name}
                </Typography>
            </td>
            <td className={classes}>
                <Typography variant="small" color="white" className="font-bold">
                    {countOfProducts}
                </Typography>
            </td>

            <td className={classes}>
                <Tooltip content="Delete">
                    <IconButton
                        onClick={handleOpenDeleteDialog}
                        color="red"
                        variant="text"
                    >
                        <TrashIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
                <CategoryDeleteFragment
                    category={category}
                    openDialog={openDeleteDialog}
                    handleOpenDialog={handleOpenDeleteDialog}
                />
            </td>
        </tr>
    )
}

export default CategoryItem
