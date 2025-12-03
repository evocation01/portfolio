import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
// Defaults to development mode (loading .env.development.local) unless explicitly in production
const dev = process.env.NODE_ENV !== "production";
loadEnvConfig(projectDir, dev);
