import { NextRequest, NextResponse } from 'next/server';
import { getBackendBaseUrl } from "../../../lib/backend";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const backendUrl = getBackendBaseUrl();

  try {
    let res = await fetch(`${backendUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 404) {
      res = await fetch(`${backendUrl}/api/auth?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }

    const data = await res.text();

    return new NextResponse(data, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('content-type') || 'application/json',
      },
    });
  } catch (error) {
    console.error("[Auth Proxy] POST error:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to login" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
