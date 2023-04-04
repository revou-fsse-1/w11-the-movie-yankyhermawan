/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./**/*.{html,js}"],
	theme: {
		fontFamily: {
			sans: ["Poppins", "sans-serif"],
			screens: {
				sm: "390px",
				lg: "1024px",
				xl: "1280px",
			},
		},
		extend: {},
	},
	plugins: [],
};
