import { upload } from "@/utils/api"

export const cloudinaryUpload = async (formData) => {
    return await upload("/api/upload/thumb", formData)
}
