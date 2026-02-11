
export async function GET(request: Request) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://backend-portfolio-ben.vercel.app");

  // Forward Authorization header if present (for admin fetch)
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (request && typeof request.headers?.get === 'function') {
    const auth = request.headers.get('authorization');
    if (auth) headers['Authorization'] = auth;
  }

  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "GET",
    headers,
  });

  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "application/json",
    },
  });
}
export async function POST(request: Request) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://backend-portfolio-ben.vercel.app");

  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: await request.text(),
  });

  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "application/json",
    },
  });
}
