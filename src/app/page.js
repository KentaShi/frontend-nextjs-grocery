"use client"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { Button, Input } from "@material-tailwind/react"
import Image from "next/image"

export default function Home() {
    return (
        <main>
            <div className="text-2xl font-bold mb-4">Welcome to Tap Hoa</div>
            <div className="relative flex w-full gap-2 md:w-max">
                <Input
                    type="search"
                    color="gray"
                    label="Type here..."
                    className="pr-20"
                    containerProps={{
                        className: "min-w-[288px]",
                    }}
                />
                <Button
                    size="sm"
                    color="blue-gray"
                    className="!absolute right-1 top-1 rounded"
                >
                    Search
                </Button>
            </div>
        </main>
    )
}
