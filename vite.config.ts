import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		// Split heavy, independently-cacheable vendors out of the main bundle.
		rollupOptions: {
			output: {
				manualChunks: {
					three: ["three"],
					charts: ["apexcharts", "react-apexcharts"],
					gsap: ["gsap"],
				},
			},
		},
		chunkSizeWarningLimit: 900,
	},
});
