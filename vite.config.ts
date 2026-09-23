import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    // Respeita a porta atribuída pelo ambiente (preview), com 5173 como padrão.
    server: {
        port: Number(process.env.PORT) || 5173,
    },
})
