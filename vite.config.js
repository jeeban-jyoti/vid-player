        import { defineConfig } from 'vite';
        import react from '@vitejs/plugin-react';

        export default defineConfig({
          plugins: [react()],
          server: {
            host: true, // Or '127.0.0.1'
            open: true, // Optional: Opens the browser automatically
          },
        });