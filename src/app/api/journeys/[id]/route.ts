import { getBackendBaseUrl } from "../../../../lib/backend";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const baseUrl = getBackendBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/api/journeys/${id}`, {
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
  } catch (error) {
    console.error("[Journeys Proxy] GET error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch journey" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const baseUrl = getBackendBaseUrl();

  try {
    // Forward all headers except host
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "host") {
        headers[key] = value;
      }
    });

    const response = await fetch(`${baseUrl}/api/journeys/${id}`, {
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
  } catch (error) {
    console.error("[Journeys Proxy] PUT error:", error);
    return new Response(JSON.stringify({ error: "Failed to update journey" }), {
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

    const response = await fetch(`${baseUrl}/api/journeys/${id}`, {
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
    console.error("[Journeys Proxy] DELETE error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete journey" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
