import React from "react"

const Dashboard = () => {
    return (
        <div className="flex flex-col items-start justify-center gap-3">
            <div className="flex justify-center items-center px-11 py-6 bg-dark-3 rounded-lg w-full h-[200px]">
                <p className="text-white text-2xl">Total Products: 100</p>
            </div>
            <div className="flex justify-center items-center px-11 py-6 bg-dark-3 rounded-lg w-full h-[200px]">
                <p className="text-white text-2xl">Total Categories: 100</p>
            </div>
            <div className="flex justify-center items-center px-11 py-6 bg-dark-3 rounded-lg w-full h-[200px]">
                <p className="text-white text-2xl">Total Account: 100</p>
            </div>
        </div>
    )
}

export default Dashboard
