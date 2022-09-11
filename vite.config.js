import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { fileURLToPath } from 'url';
/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		environment: 'jsdom'
	},
	resolve: {
		alias: {
			$src: path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
			$stores: path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src', 'stores'),
			$actions: path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src', 'actions')
		}
	}
};

export default config;
