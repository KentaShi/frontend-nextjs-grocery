import { useCateContext } from "@/contexts/category/providerCate"
import {
    Button,
    Chip,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Typography,
} from "@material-tailwind/react"
import React from "react"

const FilterProductFragment = ({ open, handleOpen }) => {
    const closeDrawer = () => handleOpen(false)

    const { state } = useCateContext()
    const { categories } = state
    return (
        <React.Fragment>
            <Drawer open={open} onClose={closeDrawer}>
                <div className="mb-2 flex items-center justify-between p-4">
                    <Typography variant="h5" color="blue-gray">
                        Filter
                    </Typography>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={closeDrawer}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <List className="my-2 p-0">
                    {categories.map((cate, index) => (
                        <ListItem
                            onClick={() => closeDrawer(false)}
                            className="group rounded-none py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:bg-green-1 hover:text-white focus:bg-green-1 focus:text-white"
                            key={index}
                        >
                            {cate.cate_name}
                            <ListItemSuffix>
                                <Chip
                                    value="5"
                                    size="sm"
                                    color="green"
                                    className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </React.Fragment>
    )
}

export default FilterProductFragment
