import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

// Replit plugins — only load when running on Replit
const isReplit = !!process.env.REPL_ID;
const replitPlugins: any[] = [];
if (isReplit) {
  try {
    const { default: runtimeErrorOverlay } =
      await import("@replit/vite-plugin-runtime-error-modal");
    replitPlugins.push(runtimeErrorOverlay());
  } catch {}

  if (process.env.NODE_ENV !== "production") {
    try {
      const cartographer = await import("@replit/vite-plugin-cartographer");
      replitPlugins.push(cartographer.cartographer());
    } catch {}
    try {
      const devBanner = await import("@replit/vite-plugin-dev-banner");
      replitPlugins.push(devBanner.devBanner());
    } catch {}
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), metaImagesPlugin(), ...replitPlugins],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
