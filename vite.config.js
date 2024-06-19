import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react({
    babel: {
      parserOpts: {
        plugins: [
          ["babel-plugin-react-compiler"],
          [
            "@babel/plugin-proposal-decorators",
            {
                "version": "2023-05"
            }
          ]
        ],
        assumptions: {
          "setPublicClassFields": false
        }
      }
    }
  })],
});
