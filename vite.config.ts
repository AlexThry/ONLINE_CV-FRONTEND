import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	base: "./",
	preview: {
		port: 8080,
		strictPort: true,
	},
	server: {
		port: 8080,
		strictPort: true,
		host: true,
		origin: "http://0.0.0.0:8080",
	},
  resolve: {
    alias: {
        react: "react",
        "react-dom": "react-dom",
    },
},
});
