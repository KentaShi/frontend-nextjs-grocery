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
        imgUrl: "/icons/account.svg",
    },
]

export const errorMessages = {
    SERVER_ERROR: {
        en: "Something went wrong, please try again",
        vi: "Có lỗi xảy ra, vui lòng thử lại sau",
    },
    FORBIDDEN: {
        en: "You are not allowed to access. Please login or try again later",
        vi: "Bạn không có quyền truy cập, vui lòng đăng nhập hoặc thử lại sau",
    },
    CONFLICTS_USERNAME: {
        en: "Username exists",
        vi: "Username đã tồn tại",
    },
    CONFLICTS_CATEGORY: {
        en: "Category exists",
        vi: "Phân loại này đã tồn tại",
    },
    NOTFOUND: {
        en: "Not found",
        vi: "Không tìm thấy",
    },
    AUTH_ERROR: {
        en: "Plase login",
        vi: "Vui lòng đăng nhập",
    },
    LOGIN_FAILED: {
        en: "Username or password is invalid",
        vi: "Tên đăng nhập hoặc mật khẩu không đúng",
    },
}
