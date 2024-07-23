import { Cog8ToothIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import {
    Avatar,
    Chip,
    IconButton,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Tooltip,
    Typography,
} from "@material-tailwind/react"
import React, { useState } from "react"
import ProductUpdateFragment from "../fragments/ProductUpdateFragment"
import ProductDeleteFragment from "../fragments/ProductDeleteFragment"

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
                <Menu
                    animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                    }}
                >
                    <MenuHandler>
                        <IconButton color="blue" variant="text">
                            <Cog8ToothIcon className="h-4 w-4" />
                        </IconButton>
                    </MenuHandler>
                    <MenuList>
                        <MenuItem onClick={handleOpenUpdateDialog}>
                            <Chip
                                className="justify-center items-center"
                                variant="ghost"
                                size="sm"
                                value="Update"
                                color="blue"
                            />
                        </MenuItem>
                        <MenuItem onClick={handleOpenDeleteDialog}>
                            <Chip
                                className="justify-center items-center"
                                variant="ghost"
                                size="sm"
                                value="Delete"
                                color="red"
                            />
                        </MenuItem>
                    </MenuList>
                </Menu>

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
