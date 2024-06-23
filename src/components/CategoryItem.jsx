import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { IconButton, Tooltip, Typography } from "@material-tailwind/react"
import React, { useEffect, useState } from "react"
import CategoryDeleteFragment from "./fragments/CategoryDeleteFragment"

const CategoryItem = ({ category, classes }) => {
    const { cate_name, cate_slug } = category
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog((p) => !p)
    }

    return (
        <tr>
            <td className={classes}>
                <Typography variant="small" color="white" className="font-bold">
                    {cate_name}
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
