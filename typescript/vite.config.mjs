import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
    plugins: [react(), tailwindcss(), flowbiteReact()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: "./src/tests/setupTests.ts",
    },
    resolve: {
        alias: {
            '@atoms': path.resolve(__dirname, 'src/components/atoms'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@const': path.resolve(__dirname, 'src/const'),
            '@molecules': path.resolve(__dirname, 'src/components/molecules'),
            '@organisms': path.resolve(__dirname, 'src/components/organisms'),
            '@templates': path.resolve(__dirname, 'src/components/templates'),
            '@pages': path.resolve(__dirname, 'src/components/pages'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@interfaces': path.resolve(__dirname, 'src/interfaces'),
            '@routes': path.resolve(__dirname, 'src/routes'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@assets': path.resolve(__dirname, 'src/assets')
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000
    }
});
