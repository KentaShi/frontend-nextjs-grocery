/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT")
module.exports = withMT({
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    1: "#1C1F2E",
                    2: "#161925",
                    3: "#252A41",
                    4: "#1E2757",
                },
                blue: {
                    1: "#0E78F9",
                },
                sky: {
                    1: "#C9DDFF",
                    2: "#ECF0FF",
                    3: "#F5FCFF",
                },
                orange: {
                    1: "#FF742E",
                },
                purple: {
                    1: "#830EF9",
                },
                yellow: {
                    1: "#F9A90E",
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
})
