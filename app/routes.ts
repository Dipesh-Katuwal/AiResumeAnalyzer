import { type RouteConfig, index,route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),route("/auth","routes/auth.tsx"),route("/upload","components/Upload.tsx")] satisfies RouteConfig;
