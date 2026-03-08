import { getBackendBaseUrl } from "../../../../lib/backend";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const baseUrl = getBackendBaseUrl();

  try {
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
  } catch (error) {
    console.error("[Contact Proxy] GET by id error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch contact" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const baseUrl = getBackendBaseUrl();

  try {
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
  } catch (error) {
    console.error("[Contact Proxy] DELETE error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete contact" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
