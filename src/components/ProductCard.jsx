import React, { useState } from "react"
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

const ProductCard = ({ product }) => {
    const { _id, product_name, product_thumb, product_price, product_cate } =
        product
    const [openUpdatePriceDialog, setOpenUpdatePriceDialog] = useState(false)
    const handleOpenUpdatePriceDialog = () => {
        setOpenUpdatePriceDialog((p) => !p)
    }
    return (
        <Card className="m-0 my-1 w-44 sm:w-52 md:w-72 lg:w-80">
            <CardHeader
                shadow={false}
                floated={false}
                className="h-44 sm:h-52 md:h-72 lg:h-80"
            >
                <img
                    src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody className="p-2">
                <div className="flex flex-col items-center justify-between">
                    <Typography
                        color="blue-gray"
                        className="font-normal text-sm"
                    >
                        {product_name}
                    </Typography>
                    <div className="flex flex-row items-center">
                        <Typography
                            color="red"
                            className="font-medium text-base"
                        >
                            {product_price}đ
                        </Typography>
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
                            handleOpenDialog={handleOpenUpdatePriceDialog}
                            onlyUpdatePrice={true}
                        />
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default ProductCard
