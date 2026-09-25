import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = repositoryName ? `/${repositoryName}/` : "/";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  base: basePath,
  resolve: {
    tsconfigPaths: true,
  },
});
