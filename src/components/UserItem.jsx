import { errorMessages } from "@/constants"
import { useAuth } from "@/contexts/auth/providerAuth"
import { getUserStatus, handleBlocking } from "@/service/user"
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
import Cookies from "js-cookie"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

const UserItem = ({ user, classes }) => {
    const { state } = useAuth()
    const { accessToken } = state
    const refreshToken = Cookies.get("refresh_token")
    const tokens = { accessToken, refreshToken }

    const { _id: userId, avatar, username, role } = user
    const [userStatus, setUserStatus] = useState("")

    const [actionBlock, setActionBlock] = useState("")

    const avatarUrl =
        avatar?.url ||
        `https://avatar.iran.liara.run/username?username=${username}`

    const handleBlockUser = async () => {
        const res = await handleBlocking(userId, actionBlock, tokens)
    }

    useEffect(() => {
        const getStatus = async () => {
            try {
                const res = await getUserStatus(userId, tokens)
                setUserStatus(res.metadata.status)
            } catch (error) {
                console.log(error.message)
                toast.error(errorMessages.SERVER_ERROR.vi)
            }
        }
        getStatus()
    }, [user])

    useEffect(() => {
        setActionBlock(userStatus === "blocked" ? "unblock" : "block")
    }, [userStatus])

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
                        value={userStatus}
                        color={
                            userStatus === "online"
                                ? "green"
                                : userStatus === "offline"
                                ? "blue-gray"
                                : "red"
                        }
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
                                className="justify-center items-center"
                                variant="ghost"
                                size="sm"
                                value={
                                    userStatus === "blocked"
                                        ? "Unblock"
                                        : "Block"
                                }
                                color="blue"
                            />
                        </MenuItem>
                        <MenuItem>
                            <Chip
                                className="justify-center items-center"
                                variant="ghost"
                                size="sm"
                                value="Change role"
                                color="green"
                            />
                        </MenuItem>
                        <MenuItem>
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
            </td>
        </tr>
    )
}

export default UserItem
