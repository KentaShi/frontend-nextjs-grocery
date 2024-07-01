import { AUTH_ACTIONS } from "@/contexts/auth/actionAuth"
import { useAuth } from "@/contexts/auth/providerAuth"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export const useLogout = () => {
    const { dispatch } = useAuth()
    const router = useRouter()

    const logout = () => {
        Cookies.remove("refresh_token")
        dispatch({ type: AUTH_ACTIONS.LOGOUT, payload: {} })
        router.push("/login")
    }

    return logout
}
