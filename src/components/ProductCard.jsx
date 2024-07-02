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

const ProductCard = ({ product }) => {
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
        setAllowEditing(user.roles === "admin" || user.roles === "user")
    }, [state])

    return (
        <Card className="m-0 my-1 w-44 sm:w-52 md:w-72 lg:w-80">
            <CardHeader
                shadow={false}
                floated={false}
                className="h-44 sm:h-52 md:h-72 lg:h-80"
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
                        className="text-base font-bold"
                    >
                        {product_name}
                    </Typography>
                    <div className="flex flex-row items-center">
                        <Typography color="red" className="font-bold text-lg">
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
