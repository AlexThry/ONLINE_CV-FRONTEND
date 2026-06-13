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
				"serif-title": ["DM Serif Display", "serif"],
				cousine: ["Cousine", "monospace"],
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
				/* Atmosphere */
				night: "#06040A",
				ink: "#0C0814",
				mist: "#F5F1FA",
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
			transitionTimingFunction: {
				expo: "cubic-bezier(0.16, 1, 0.3, 1)",
				"in-out-soft": "cubic-bezier(0.65, 0.05, 0.36, 1)",
			},
			letterSpacing: {
				huge: "0.4em",
			},
			keyframes: {
				marquee: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-14px)" },
				},
				shimmer: {
					"100%": { transform: "translateX(100%)" },
				},
				"spin-slow": {
					to: { transform: "rotate(360deg)" },
				},
				"pulse-soft": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.45" },
				},
			},
			animation: {
				marquee: "marquee 32s linear infinite",
				float: "float 7s ease-in-out infinite",
				shimmer: "shimmer 1.8s infinite",
				"spin-slow": "spin-slow 26s linear infinite",
				"pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
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
