import { postData, getData, deleteData, updateData } from "@/utils/api"

export const findAllCategories = async () => {
    const res = await getData("/api/category/all")
    if (res.status !== 200) {
        throw new Error(res?.message || "Failed to get category")
    }
    return res
}
