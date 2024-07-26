"use client"
import React, { useEffect, useState } from "react"
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    CardFooter,
    Tooltip,
    IconButton,
} from "@material-tailwind/react"
import { PencilIcon } from "@heroicons/react/24/solid"
import ProductUpdateFragment from "./fragments/ProductUpdateFragment"
import { useAuth } from "@/contexts/auth/providerAuth"

const ProductCard = ({ product, index }) => {
    const {
        _id,
        product_name,
        product_thumb,
        product_price,
        product_unit,
        product_cate,
    } = product
    const { state } = useAuth()
    const { user } = state

    // const allowEditing = roles === "admin" || roles === "user"

    const [openUpdatePriceDialog, setOpenUpdatePriceDialog] = useState(false)
    const [allowEditing, setAllowEditing] = useState(false)
    const handleOpenUpdatePriceDialog = () => {
        setOpenUpdatePriceDialog((p) => !p)
    }

    useEffect(() => {
        if (!user) return
        setAllowEditing(user.role === "admin" || user.role === "user")
    }, [state])

    return (
        <Card className="m-0 w-full rounded-sm border border-green-light hover:shadow transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300">
            <CardHeader
                shadow={false}
                floated={false}
                className="m-0 h-32 sm:h-44 md:h-52 lg:h-72 rounded-none"
            >
                <img
                    src={product_thumb.url}
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody className="p-2">
                <div className="flex flex-col items-center justify-between">
                    <Typography
                        color="blue-gray"
                        className="text-xs sm:text-sm font-bold hover:text-green-2"
                    >
                        {product_name}
                    </Typography>
                    <div className="flex flex-row items-center">
                        <Typography
                            color="red"
                            className="font-bold text-green-1 text-xs sm:text-sm"
                        >
                            {product_price.toLocaleString()}đ/{product_unit}
                        </Typography>
                        {allowEditing && (
                            <>
                                <Tooltip content="Edit Price">
                                    <IconButton
                                        onClick={handleOpenUpdatePriceDialog}
                                        color="blue"
                                        variant="text"
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                    </IconButton>
                                </Tooltip>
                                <ProductUpdateFragment
                                    product={product}
                                    openDialog={openUpdatePriceDialog}
                                    handleOpenDialog={
                                        handleOpenUpdatePriceDialog
                                    }
                                    onlyUpdatePrice={true}
                                />
                            </>
                        )}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default ProductCard
