import {defineConfig, loadEnv} from "vite";
import symfonyPlugin from "vite-plugin-symfony";
import fs from 'fs';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig(({mode}) => {
        const env = loadEnv(mode, process.cwd())
        const SERVER_NAME = env.VITE_SERVER_NAME;

        return {
            root: 'assets',
            base: '/build/',
            plugins: [
                react(),
                tailwindcss(),
                flowbiteReact(),
                symfonyPlugin(),
            ],
            test: {
                setupFiles: "./src/setupTests.ts",
                environment: 'jsdom',
                globals: true,
            },
            resolve: {
                alias: {
                    '@atoms': path.resolve(__dirname, 'assets/src/components/atoms'),
                    "@const": path.resolve(__dirname, 'assets/src/const'),
                    '@molecules': path.resolve(__dirname, 'assets/src/components/molecules'),
                    '@organisms': path.resolve(__dirname, 'assets/src/components/organisms'),
                    '@templates': path.resolve(__dirname, 'assets/src/components/templates'),
                    '@pages': path.resolve(__dirname, 'assets/src/components/pages'),
                    '@features': path.resolve(__dirname, 'assets/src/features'),
                    '@hooks': path.resolve(__dirname, 'assets/src/hooks'),
                    '@interfaces': path.resolve(__dirname, 'assets/src/interfaces'),
                    '@routes': path.resolve(__dirname, 'assets/src/routes'),
                    '@services': path.resolve(__dirname, 'assets/src/services'),
                    '@assets': path.resolve(__dirname, 'assets/src/assets')
                }
            },
            build: {
                outDir: path.resolve(__dirname, 'public/build'),
                emptyOutDir: true,
                manifest: true,
                rollupOptions: {
                    input: {
                        app: path.resolve(__dirname, 'assets/src/main.tsx'),
                    },
                },
            },
            server: {
                host: '0.0.0.0',
                port: 3000,
                origin: `https://${SERVER_NAME}:3000`,
                https: {
                    key: fs.readFileSync(`/data/caddy/certificates/local/${SERVER_NAME}/${SERVER_NAME}.key`),
                    cert: fs.readFileSync(`/data/caddy/certificates/local/${SERVER_NAME}/${SERVER_NAME}.crt`),
                },
            }
        }
    }
)
