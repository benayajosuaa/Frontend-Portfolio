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

    console.log("[Journeys Proxy] GET request to:", `${baseUrl}/api/journeys`);

    const response = await fetch(`${baseUrl}/api/journeys`, {
      method: "GET",
      headers,
    });

    const body = await response.text();
    console.log("[Journeys Proxy] GET response status:", response.status);

    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("[Journeys Proxy] GET error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch journeys" }), {
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
    // Forward all headers except host
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "host") {
        headers[key] = value;
      }
    });

    console.log("[Journeys Proxy] POST request to:", `${baseUrl}/api/journeys`);

    const response = await fetch(`${baseUrl}/api/journeys`, {
      method: "POST",
      headers,
      body: request.body,
      // @ts-ignore - duplex is required for streaming body
      duplex: "half",
    });

    const body = await response.text();
    console.log("[Journeys Proxy] POST response status:", response.status);

    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("[Journeys Proxy] POST error:", error);
    return new Response(JSON.stringify({ error: "Failed to create journey" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
