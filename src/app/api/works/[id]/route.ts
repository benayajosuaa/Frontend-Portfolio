export async function GET(request: Request, context: any) {
  let id = "";
  if (context?.params) {
    const params = typeof context.params.then === "function" ? await context.params : context.params;
    id = params.id;
  }
  id = id || new URL(request.url).pathname.split("/").pop() || "";
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://backend-portfolio-ben.vercel.app");

  const response = await fetch(`${baseUrl}/api/works/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "application/json",
    },
  });
}

export async function PUT(request: Request, context: any) {
  let id = "";
  if (context?.params) {
    const params = typeof context.params.then === "function" ? await context.params : context.params;
    id = params.id;
  }
  id = id || new URL(request.url).pathname.split("/").pop() || "";
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://backend-portfolio-ben.vercel.app");

  // Forward all headers except host
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "host") {
      headers[key] = value;
    }
  });

  const response = await fetch(`${baseUrl}/api/works/${id}`, {
    method: "PUT",
    headers,
    body: request.body,
    // @ts-ignore - duplex is required for streaming body
    duplex: "half",
  });

  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "application/json",
    },
  });
}

export async function DELETE(request: Request, context: any) {
  let id = "";
  if (context?.params) {
    const params = typeof context.params.then === "function" ? await context.params : context.params;
    id = params.id;
  }
  id = id || new URL(request.url).pathname.split("/").pop() || "";
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://backend-portfolio-ben.vercel.app");

  const headers: Record<string, string> = {};
  const auth = request.headers.get("authorization");
  if (auth) headers["Authorization"] = auth;

  const response = await fetch(`${baseUrl}/api/works/${id}`, {
    method: "DELETE",
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
