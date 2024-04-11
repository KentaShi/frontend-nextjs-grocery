import { ACTIONS } from "./action"
import { initState } from "./state"

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.AUTH: {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
            }
        }
        case ACTIONS.LOGOUT: {
            return initState
        }
        default:
            return state
    }
}

export default reducer
