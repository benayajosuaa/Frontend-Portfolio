export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://portfolio-b-alpha-lilac.vercel.app");

  try {
    console.log("[Works Proxy] GET request to:", `${baseUrl}/api/works`);
    
    const response = await fetch(`${baseUrl}/api/works`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const body = await response.text();
    console.log("[Works Proxy] GET response status:", response.status);

    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("[Works Proxy] GET error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch works" }), {
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

    console.log("[Works Proxy] POST request to:", `${baseUrl}/api/works`);

    const response = await fetch(`${baseUrl}/api/works`, {
      method: "POST",
      headers,
      body: request.body,
      // @ts-ignore - duplex is required for streaming body
      duplex: "half",
    });

    const body = await response.text();
    console.log("[Works Proxy] POST response status:", response.status);

    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("[Works Proxy] POST error:", error);
    return new Response(JSON.stringify({ error: "Failed to create work" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
