import { useAuth } from "@/contexts/auth/providerAuth"
import { findProductsByCate } from "@/service/product"
import Cookies from "js-cookie"
import React from "react"

const Category = async ({ params }) => {
    //todo: add access token to request, ok?
    const { state } = useAuth()
    const { accessToken } = state
    const refreshToken = Cookies.get("refresh_token")
    const tokens = { accessToken, refreshToken }
    const products = await findProductsByCate(params.slug, tokens)
    return <div>Category: {params.slug}</div>
}

export default Category
