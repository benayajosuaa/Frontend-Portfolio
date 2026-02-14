export async function GET(request: Request) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://portfolio-b-alpha-lilac.vercel.app");

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
      : "https://portfolio-b-alpha-lilac.vercel.app");

  // Clone the request body before consuming it
  const bodyText = await request.text();
  
  console.log("[Contact Proxy] POST body:", bodyText);
  console.log("[Contact Proxy] Forwarding to:", `${baseUrl}/api/contact`);

  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: bodyText,
  });

  const responseBody = await response.text();
  console.log("[Contact Proxy] Response status:", response.status);
  console.log("[Contact Proxy] Response body:", responseBody);

  return new Response(responseBody, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "application/json",
    },
  });
}