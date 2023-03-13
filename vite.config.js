import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Without it dynamic require is not possible in config file
import { createRequire } from "module";
const require = createRequire(import.meta.url);

export default defineConfig({
  build: {
    commonjsOptions: {
      defaultIsModuleExports(id) {
        const module = require(id);
        if (module?.default) {
          return false;
        }
        return "auto";
      },
    },
  },
  plugins: [react()],
});