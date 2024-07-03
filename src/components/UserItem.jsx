import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import {
    Avatar,
    IconButton,
    Tooltip,
    Typography,
} from "@material-tailwind/react"
import React from "react"

const UserItem = ({ user, classes }) => {
    const { _id, username, roles } = user
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
                <Typography variant="small" color="white" className="font-bold">
                    active
                </Typography>
            </td>

            <td className={classes}>
                <Tooltip content="Update user">
                    <IconButton color="blue" variant="text">
                        <PencilIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
                <Tooltip content="Delete User">
                    <IconButton color="red" variant="text">
                        <TrashIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
            </td>
        </tr>
    )
}

export default UserItem
