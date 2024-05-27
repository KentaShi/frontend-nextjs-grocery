import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { IconButton, Tooltip, Typography } from "@material-tailwind/react"
import React from "react"

const CategoryItem = ({ category, classes }) => {
    const { cate_name } = category
    return (
        <tr>
            <td className={classes}>
                <Typography variant="small" color="white" className="font-bold">
                    {cate_name}
                </Typography>
            </td>
            <td className={classes}>
                <Typography variant="small" color="white" className="font-bold">
                    1000
                </Typography>
            </td>

            <td className={classes}>
                <Tooltip content="Update Product">
                    <IconButton color="blue" variant="text">
                        <PencilIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
                <Tooltip content="Delete Product">
                    <IconButton color="red" variant="text">
                        <TrashIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
            </td>
        </tr>
    )
}

export default CategoryItem
