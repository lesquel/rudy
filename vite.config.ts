import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      events: "events",
      util: "util",
      process: "process/browser",
    },
  },
  optimizeDeps: {
    include: ["pouchdb-browser"],
  },
});
