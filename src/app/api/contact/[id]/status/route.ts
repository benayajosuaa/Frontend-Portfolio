import { getBackendBaseUrl } from "../../../../../lib/backend";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const baseUrl = getBackendBaseUrl();

  try {
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
  } catch (error) {
    console.error("[Contact Proxy] PUT status error:", error);
    return new Response(JSON.stringify({ error: "Failed to update contact status" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
