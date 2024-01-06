/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			
		},
		extend: {
			fontFamily: {
				'header' : "Space Grotesk Variable, sans-serif",
				'title' : "'Rubik Variable', sans-serif"
			}
		}
	},

	plugins: []
};

module.exports = config;
