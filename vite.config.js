import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  // 	proxy: {
  // 		"/api": {
  // 			target: "http://localhost:5173",
  // 			changeOrigin: true,
  // 			secure: false,
  // 		},
  // 	},
  // },
  plugins: [react()],
  assetsInclude: ["/src/assets/*.{ico,jpg,jpeg,gif,svg,.png}"],
});
