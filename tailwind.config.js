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
                    1: "#061827",
                    2: "#222222",
                },
                blue: {
                    1: "#0E78F9",
                    light: "#e7f5f5",
                },
                green: {
                    1: "#02693B",
                    2: "#007A4A",
                    light: "#93DB17",
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
