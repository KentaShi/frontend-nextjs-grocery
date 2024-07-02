import { Button, CardFooter, IconButton } from "@material-tailwind/react"
import React from "react"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }
    const handlePageClick = (page) => {
        onPageChange(page)
    }
    return (
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 text-white">
            <Button
                variant="outlined"
                size="sm"
                disabled={currentPage === 1}
                onClick={handlePrevious}
                className={`${currentPage === 1 ? "bg-gray-300" : "bg-white"}`}
            >
                Previous
            </Button>
            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <IconButton
                        key={index + 1}
                        onClick={() => handlePageClick(index + 1)}
                        variant="outlined"
                        size="sm"
                        className={`${
                            currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-white"
                        }`}
                    >
                        {index + 1}
                    </IconButton>
                ))}
            </div>
            <Button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                variant="outlined"
                size="sm"
                className={`${
                    currentPage === totalPages ? "bg-gray-300" : "bg-white"
                }`}
            >
                Next
            </Button>
        </CardFooter>
    )
}

export default Pagination
