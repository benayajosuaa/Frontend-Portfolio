export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params?.id || new URL(request.url).pathname.split("/").slice(-2, -1)[0] || "";
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://backend-portfolio-ben.vercel.app");

  const headers: Record<string, string> = {
    "Content-Type": request.headers.get("content-type") || "application/json",
  };
  const auth = request.headers.get("authorization");
  if (auth) headers["Authorization"] = auth;

  const response = await fetch(`${baseUrl}/api/contact/${id}/status`, {
    method: "PUT",
    headers,
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
