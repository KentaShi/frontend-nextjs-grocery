import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import {
    Avatar,
    IconButton,
    Tooltip,
    Typography,
} from "@material-tailwind/react"
import React, { useState } from "react"
import ProductUpdateFragment from "./fragments/ProductUpdateFragment"
import ProductDeleteFragment from "./fragments/ProductDeleteFragment"

const ProductItem = ({ product, classes }) => {
    const {
        _id,
        product_name,
        product_thumb,
        product_price,
        product_unit,
        product_cate,
    } = product
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog((p) => !p)
    }
    const handleOpenUpdateDialog = () => {
        setOpenUpdateDialog((p) => !p)
    }
    return (
        <tr>
            <td className={classes}>
                <div className="flex items-center gap-3">
                    <Avatar
                        src={product_thumb.url}
                        variant="rounded"
                        alt={product_name}
                        size="md"
                        className="border border-blue-gray-50  object-contain p-1"
                    />
                    <Typography
                        variant="small"
                        color="white"
                        className="font-bold"
                    >
                        {product_name}
                    </Typography>
                </div>
            </td>
            <td className={classes}>
                <Typography variant="small" color="white" className="font-bold">
                    {product_price.toLocaleString()}đ/{product_unit}
                </Typography>
            </td>
            <td className={classes}>
                <Typography variant="small" color="white" className="font-bold">
                    {product_cate}
                </Typography>
            </td>

            <td className={classes}>
                <Tooltip content="Update">
                    <IconButton
                        onClick={handleOpenUpdateDialog}
                        color="blue"
                        variant="text"
                    >
                        <PencilIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
                <Tooltip content="Delete">
                    <IconButton
                        onClick={handleOpenDeleteDialog}
                        color="red"
                        variant="text"
                    >
                        <TrashIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
                <ProductUpdateFragment
                    product={product}
                    openDialog={openUpdateDialog}
                    handleOpenDialog={handleOpenUpdateDialog}
                />
                <ProductDeleteFragment
                    product={product}
                    openDialog={openDeleteDialog}
                    handleOpenDialog={handleOpenDeleteDialog}
                />
            </td>
        </tr>
    )
}

export default ProductItem
