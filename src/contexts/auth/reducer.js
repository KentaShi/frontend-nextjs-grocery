import { ACTIONS } from "./action"
import { initState } from "./state"

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN: {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                tokens: action.payload.tokens,
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
