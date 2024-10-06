import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000, // Desired port
    host: "0.0.0.0", // Allows access from the local network
    strictPort: true, // Fail if the port is already in use
    https: true,
  },
  plugins: [react(), mkcert()],
});
