import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Dialog,
    Typography,
} from "@material-tailwind/react"
import React, { Fragment } from "react"

const CategoryDeleteFragment = ({ category, openDialog, handleOpenDialog }) => {
    const handleDeleteCategory = async () => {}
    return (
        <Fragment>
            <Dialog
                size="xs"
                open={openDialog}
                handler={handleOpenDialog}
                className="bg-transparent shadow-none"
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="paragraph" color="blue-gray">
                            Xóa phân loại{" "}
                            <span className="font-bold text-lg">
                                {category.cate_name}
                            </span>
                            ?
                        </Typography>
                    </CardBody>
                    <CardFooter className="flex flex-row  pt-0">
                        <Button
                            onClick={handleOpenDialog}
                            className="mr-2"
                            color="red"
                            variant="gradient"
                            fullWidth
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleDeleteCategory}
                            color="blue"
                            variant="gradient"
                            fullWidth
                        >
                            Xóa
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </Fragment>
    )
}

export default CategoryDeleteFragment
