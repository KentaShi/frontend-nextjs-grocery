import { ACTIONS } from "./action"
const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.AUTH: {
            return {
                ...state,
                auth: action.payload,
            }
        }
    }
}

export default reducer
