export async function GET(request: Request) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://portfolio-b-alpha-lilac.vercel.app");

  try {
    // Forward Authorization header if present (for admin fetch)
    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (request && typeof request.headers?.get === 'function') {
      const auth = request.headers.get('authorization');
      if (auth) headers['Authorization'] = auth;
    }

    console.log("[Contact Proxy] GET request to:", `${baseUrl}/api/contact`);

    const response = await fetch(`${baseUrl}/api/contact`, {
      method: "GET",
      headers,
    });

    const body = await response.text();
    console.log("[Contact Proxy] GET response status:", response.status);

    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("[Contact Proxy] GET error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch contacts" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(request: Request) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://portfolio-b-alpha-lilac.vercel.app");

  try {
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
  } catch (error) {
    console.error("[Contact Proxy] POST error:", error);
    return new Response(JSON.stringify({ error: "Failed to create contact message" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}