export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params?.id || new URL(request.url).pathname.split("/").pop() || "";
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://backend-portfolio-ben.vercel.app");

  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  const auth = request.headers.get("authorization");
  if (auth) headers["Authorization"] = auth;

  const response = await fetch(`${baseUrl}/api/contact/${id}`, {
    method: "GET",
    headers,
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params?.id || new URL(request.url).pathname.split("/").pop() || "";
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://backend-portfolio-ben.vercel.app");

  const headers: Record<string, string> = {};
  const auth = request.headers.get("authorization");
  if (auth) headers["Authorization"] = auth;

  const response = await fetch(`${baseUrl}/api/contact/${id}`, {
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
