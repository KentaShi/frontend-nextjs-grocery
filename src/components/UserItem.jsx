import { Cog8ToothIcon, TrashIcon } from "@heroicons/react/24/solid"
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
import React from "react"

const UserItem = ({ user, classes }) => {
    const { _id, username, roles } = user
    const status = "online"
    return (
        <tr>
            <td className={classes}>
                <div className="flex items-center gap-3">
                    <Avatar
                        src={""}
                        variant="rounded"
                        alt={username}
                        size="md"
                        className="border border-blue-gray-50  object-contain p-1"
                    />
                    <Typography
                        variant="small"
                        color="white"
                        className="font-bold"
                    >
                        {username}
                    </Typography>
                </div>
            </td>
            <td className={classes}>
                <Typography variant="small" color="white" className="font-bold">
                    {roles}
                </Typography>
            </td>
            <td className={classes}>
                <div className="font-bold w-max text-white">
                    <Chip
                        variant="ghost"
                        size="sm"
                        value={status ? "online" : "offline"}
                        color={status ? "green" : "blue-gray"}
                    />
                </div>
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
                        <MenuItem>Block</MenuItem>
                        <MenuItem>Change role</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </MenuList>
                </Menu>
            </td>
        </tr>
    )
}

export default UserItem
