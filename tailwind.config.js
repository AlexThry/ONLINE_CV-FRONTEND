const flowbite = require("flowbite-react/tailwind");
const daisyui = require("daisyui");

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
	theme: {
		screens: {
			'sm': '640px',
			// => @media (min-width: 640px) { ... }
	  
			'md': '768px',
			// => @media (min-width: 768px) { ... }

			'mdl': '920px',
			// => @media (min-width: 910px) { ... }
	  
			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }
	  
			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }
	  
			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }

			'hmd': {'raw': '(min-height: 600px)'},
			'hlg': {'raw': '(min-height: 700px)'},
			'hxl': {'raw': '(min-height: 800px)'},
			'hxxl': {'raw': '(min-height: 1000px)'},

			'hxl-mdl': {'raw': '(min-height: 800px) and (min-width: 920px)'},
			'hxxl-2xl': {'raw': '(min-height: 1000px) and (min-width: 1536px)'},
		},
		extend: {
			fontFamily: {
				"serif-title": ["DM Serif Display"],
				cousine: ["Cousine", "serif"],
			},
			colors: {
				main: {
					base: "#000000",
					100: "#BF93E4",
					300: "#AD75DD",
					500: "#7E26C9",
					700: "#6006AE",
					900: "#410080",
				},
				languages: {
					base: "#EAC8CA",
				},
				commits: {
					base: "#99E1D9",
				},
				repos: {
					base: "#F9F8F8",
				},
			},
		},
	},
	plugins: [
		flowbite.plugin()({
			charts: true,
		}),
		daisyui
	],
};
