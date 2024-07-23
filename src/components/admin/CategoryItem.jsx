import { Cog8ToothIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import {
    Chip,
    IconButton,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Tooltip,
    Typography,
} from "@material-tailwind/react"
import React, { useEffect, useState } from "react"
import CategoryDeleteFragment from "../fragments/CategoryDeleteFragment"

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
