import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/pong/",
	css: {
		modules: {
			localsConvention: "camelCaseOnly",
		},
	},
	plugins: [basicSsl(), react()],
});
