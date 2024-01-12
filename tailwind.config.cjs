/** @type {import('tailwindcss').Config}*/

import plugin from 'tailwindcss/plugin';

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
}


module.exports = config;
