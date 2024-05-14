import { postData } from "@/utils/api"

export const cloudinaryUpload = async (file) => {
    return await postData("/api/upload/thumb", file)
}
