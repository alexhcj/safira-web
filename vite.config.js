import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import jsconfigPaths from 'vite-jsconfig-paths'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => ({
	plugins: [
		react({
			include: '**/*.{jsx,js}',
		}),
		svgr(),
		jsconfigPaths(),
	],
	define: {
		__APP_ENV__: JSON.stringify(mode),
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@api': path.resolve(__dirname, './src/api'),
			'@context': path.resolve(__dirname, './src/context'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@modules': path.resolve(__dirname, './src/modules'),
			'@components': path.resolve(__dirname, './src/components'),
			'@shared': path.resolve(__dirname, './src/shared'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@assets': path.resolve(__dirname, './src/assets'),
		},
	},
	server: {
		port: 3000,
	},
	preview: {
		port: 3000,
	},
}))
