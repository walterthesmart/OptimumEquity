import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      appDirectory: 'src',
      server: {
        entry: './src/server.ts'
      }
    }),
    nitro({
      preset: process.env.VERCEL ? 'vercel' : undefined,
      externals: {
        inline: [/tslib/, /@radix-ui/],
        traceInclude: ['node_modules/.prisma/client/**/*', 'node_modules/tslib/**/*']
      }
    }),

    react(),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  ssr: {
    noExternal: ['tslib', /@radix-ui\/.*/]
  }
});
