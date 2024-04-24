const { PRODUCT_ACTIONS } = require("./actionProduct")

const reducerProduct = (state, action) => {
    switch (action.type) {
        case PRODUCT_ACTIONS.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            }
        case PRODUCT_ACTIONS.ADD:
            return {
                ...state,
                products: [...state.products, action.payload],
            }
        case PRODUCT_ACTIONS.UPDATE:
            return {
                ...state,
                products: state.products.map((p) => {
                    if (p._id === action.payload._id) {
                        return { ...p, ...action.payload }
                    }
                    return p
                }),
            }
        case PRODUCT_ACTIONS.DELETE:
            return {
                ...state,
                products: state.products.filter(
                    (p) => p._id !== action.payload._id
                ),
            }
    }
}
export default reducerProduct
