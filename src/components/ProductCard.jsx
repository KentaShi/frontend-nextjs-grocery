import React from "react"
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react"

const ProductCard = ({ product }) => {
    const { _id, product_name, product_thumb, product_price, product_cate } =
        product

    return (
        <Card className="m-0 w-44 sm:w-72 lg:w-96">
            <CardHeader
                shadow={false}
                floated={false}
                className="h-44 sm:h-72 lg:h-96"
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
                    <Typography color="red" className="font-medium text-base">
                        {product_price}đ
                    </Typography>
                </div>
            </CardBody>
        </Card>
    )
}

export default ProductCard
