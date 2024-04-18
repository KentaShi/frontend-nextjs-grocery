import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import {
    Avatar,
    IconButton,
    Tooltip,
    Typography,
} from "@material-tailwind/react"
import React from "react"

const ProductItem = ({ product, classes }) => {
    const { _id, product_name, product_thumb, product_price, product_cate } =
        product
    return (
        <tr>
            <td className={classes}>
                <div className="flex items-center gap-3">
                    <Avatar
                        src={product_thumb}
                        alt={product_name}
                        size="md"
                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                    />
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                    >
                        {product_name}
                    </Typography>
                </div>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {product_price}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {product_cate}
                </Typography>
            </td>

            <td className={classes}>
                <Tooltip content="Sửa sản phẩm">
                    <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
                <Tooltip content="Xóa sản phẩm">
                    <IconButton color="red" variant="text">
                        <TrashIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
            </td>
        </tr>
    )
}

export default ProductItem
