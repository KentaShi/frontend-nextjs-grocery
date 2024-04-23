import { AUTH_ACTIONS } from "./actionAuth"
import { initState } from "./providerAuth"

const reducer = (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.AUTH: {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
            }
        }
        case AUTH_ACTIONS.LOGOUT: {
            return initState
        }
        default:
            return state
    }
}

export default reducer
