const DEV_BACKEND_URL = "http://localhost:8080";
const PROD_BACKEND_URL = "https://halobenaya-backend-2.vercel.app";

export function getBackendBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim() !== "") {
    return envUrl.replace(/\/+$/, "");
  }

  return process.env.NODE_ENV === "development"
    ? DEV_BACKEND_URL
    : PROD_BACKEND_URL;
}
