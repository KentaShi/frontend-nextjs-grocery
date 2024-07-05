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
import React, { useEffect, useState } from "react"

const UserItem = ({ user, classes }) => {
    const { _id, avatar, username, role } = user
    const status = "online"

    const avatarUrl =
        avatar?.url ||
        `https://avatar.iran.liara.run/username?username=${username}`

    return (
        <tr>
            <td className={classes}>
                <div className="flex items-center gap-3">
                    <Avatar
                        src={avatarUrl}
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
                    {role}
                </Typography>
            </td>
            <td className={classes}>
                <div className="font-bold w-max text-white">
                    <Chip
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
                        <MenuItem>
                            <Chip
                                variant="ghost"
                                size="sm"
                                value="Block"
                                color="blue"
                            />
                        </MenuItem>
                        <MenuItem>
                            <Chip
                                variant="ghost"
                                size="sm"
                                value="Change Role"
                                color="green"
                            />
                        </MenuItem>
                        <MenuItem>
                            <Chip
                                variant="ghost"
                                size="sm"
                                value="Delete"
                                color="red"
                            />
                        </MenuItem>
                    </MenuList>
                </Menu>
            </td>
        </tr>
    )
}

export default UserItem
