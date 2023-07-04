import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5173
	},
	resolve: {
		alias: {
			"readable-stream": "vite-compatible-readable-stream",
			stream: "vite-compatible-readable-stream"
		}
	},
	optimizeDeps: {
		esbuildOptions: {
			plugins: [
				NodeGlobalsPolyfillPlugin({
					process: true,
					buffer: true
				})
			]
		},
	},
	build: {
		target: "esnext",
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
});