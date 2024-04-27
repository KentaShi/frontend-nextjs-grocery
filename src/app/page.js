import SearchProduct from "@/components/SearchProduct"

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold mb-4">Welcome to Tap Hoa</div>
            <div>
                <SearchProduct />
            </div>
        </div>
    )
}
