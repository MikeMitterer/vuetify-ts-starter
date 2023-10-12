// Was wird benötigt:
//     yarn add --dev vite-plugin-node-polyfills

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { format } from 'date-fns'
import { VitePWA } from 'vite-plugin-pwa'

import pkg from './package.json';

import path from "path"

const date = format(Date.now(), 'yyyy.MM.dd HH:mm');
const devMode = process.env.NODE_ENV !== 'production';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');
    console.log(`Mode: ${mode}, Command: ${command}`)
    
    return {
        // rollupOptions: {
        //     plugins: [
        //         rollupNodePolyFill()
        //     ]
        // },
        define: {
            // global: 'globalThis',
            // globalThis.Buffer = Buffer,

            'process.env.VUE_APP_TITLE': JSON.stringify(env.VUE_APP_TITLE),
            'process.env.VUE_APP_SERVER_PROTOCOL': JSON.stringify(env.VUE_APP_SERVER_PROTOCOL),
            'process.env.VUE_APP_SERVER_HOST': JSON.stringify(env.VUE_APP_SERVER_HOST),
            'process.env.VUE_APP_SERVER_PORT': JSON.stringify(env.VUE_APP_SERVER_PORT),
            'process.env.VUE_APP_SERVER_API': JSON.stringify(env.VUE_APP_SERVER_API),

            'process.env.VUE_APP_AUTH_SERVER_URL': JSON.stringify(env.VUE_APP_AUTH_SERVER_URL),
            'process.env.VUE_APP_AUTH_REALM': JSON.stringify(env.VUE_APP_AUTH_REALM),
            'process.env.VUE_APP_AUTH_CLIENT_ID': JSON.stringify(env.VUE_APP_AUTH_CLIENT_ID),

            'process.env.VUE_APP_VERSION': JSON.stringify(pkg.version),
            'process.env.VUE_APP_DEV_MODE': devMode,
            'process.env.VUE_APP_PUBLISHED': JSON.stringify(date),

            // If you want to expose all env variables, which is not recommended
            // 'process.env': env
        },

        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                process: "process/browser", // yarn add process
                path: "path-browserify",
                crypto: "crypto-browserify",
                stream: "stream-browserify",
                zlib: "browserify-zlib",
                util: "util", // yarn add util
            },
        },
        plugins: [
            // vplugin.pluginVueEnv({
            //
            // }, {
            //     fileRegexp: /\.(ts|vue|html)/i,
            //     debug: true }),

            // https://www.npmjs.com/package/@vitejs/plugin-vue2
            vue(),

            // https://www.npmjs.com/package/vite-plugin-node-polyfills
            nodePolyfills({
                globals: {
                    Buffer: true, // can also be 'build', 'dev', or false
                    global: true,
                    process: true,
                },
                // Whether to polyfill `node:` protocol imports.
                protocolImports: true,
            }),

            // Or With Vite Config
            ViteEjsPlugin((viteConfig) => {
                // viteConfig is the current viteResolved config.
                return {
                    root: viteConfig.root,
                    BASE_URL: "/",
                    VUE_APP_TITLE: JSON.stringify(env.VUE_APP_TITLE),
                    VUE_APP_DEV_MODE: devMode
                }
            }),
            VitePWA(),
        ],
        // optimizeDeps: {
        //     esbuildOptions: {
        //         // Node.js global to browser globalThis
        //         define: {
        //             global: 'globalThis'
        //         },
        //         // Enable esbuild polyfill plugins
        //         plugins: [
        //             NodeGlobalsPolyfillPlugin({
        //                 buffer: true,
        //                 process: true,
        //             }),
        //             NodeModulesPolyfillPlugin()
        //         ]
        //     }
        // },
    };
});

