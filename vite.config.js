import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler"],
          [
            "@babel/plugin-proposal-decorators",
            { version: "2023-05" }
          ],
          "module:@preact/signals-react-transform"
        ],
        assumptions: {
          setPublicClassFields: false
        }
      }
    })
  ],
});
