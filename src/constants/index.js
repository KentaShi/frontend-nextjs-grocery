export const sidebarLinks = [
    {
        label: "Dashboard",
        route: "/dashboard",
        imgUrl: "/icons/dashboard.svg",
    },
    {
        label: "Product",
        route: "/product",
        imgUrl: "/icons/product.svg",
    },
    {
        label: "Category",
        route: "/category",
        imgUrl: "/icons/category.svg",
    },
    {
        label: "User",
        route: "/user",
        imgUrl: "/icons/user.svg",
    },
]

export const errorMessages = {
    SERVER_ERROR: {
        en: "Something went wrong, please try again",
        vi: "Có lỗi xảy ra, vui lòng thử lại sau",
    },
    FORBIDDEN: {
        en: "You are not allowed to access. Please login again",
        vi: "Bạn đã đăng nhập nơi khác, vui lòng đăng nhập lại",
    },
    CONFLICTS_USERNAME: {
        en: "Username exists",
        vi: "Username đã tồn tại",
    },
}
