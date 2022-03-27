const path = require("path");
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  define: {
    DEBUG: true,
    GAME_HEIGHT: 1080,
    GAME_WIDTH: 1920,
  },
  root: "./",
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src/"),
      assets: path.join(__dirname, "./assets/"),
      Utils: path.join(__dirname, "./src/utils/"),
      Sprites: path.join(__dirname, "./src/sprites/"),
      Types: path.join(__dirname, "./types/"),
    },
  },
  build: {
    outDir: "./dist",
    // Do not inline images and assets to avoid the phaser error
    // "Local data URIs are not supported"
    assetsInlineLimit: 0
  },
});
