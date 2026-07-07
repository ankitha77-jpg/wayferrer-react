import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    // Copy the root attached_assets folder directly into dist/public
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(import.meta.dirname, "attached_assets/*"),
          dest: "attached_assets",
        },
      ],
    }),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      allow: [path.resolve(import.meta.dirname, ".")],
      deny: ["**/.*"],
    },
    watch: {
      usePolling: true,
      interval: 100,
      ignored: [
        '**/OneDrive/**',
        '**/node_modules/**',
        '**/.git/**',
      ],
    },
  },
});