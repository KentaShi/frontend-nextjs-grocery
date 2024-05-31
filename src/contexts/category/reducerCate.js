const { CATE_ACTIONS } = require("./actionCate")

const reducerCate = (state, action) => {
    switch (action.type) {
        case CATE_ACTIONS.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }
        case CATE_ACTIONS.ADD:
            return {
                ...state,
                categories: [...state.categories, action.payload],
            }
        default:
            return state
    }
}
export default reducerCate
