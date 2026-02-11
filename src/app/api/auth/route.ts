import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function POST(req: NextRequest) {
  // Forward the request body and headers to the backend
  const bodyText = await req.text();
  let body: any = {};
  try {
    body = JSON.parse(bodyText);
  } catch {}

  // Tentukan endpoint: login atau register
  let endpoint = '/api/auth/login';
  if (body.register) {
    endpoint = '/api/auth/register';
    // Remove the helper flag before forwarding
    delete body.register;
  }

  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': req.headers.get('content-type') || 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  const data = await res.text();
  const response = new NextResponse(data, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') || 'application/json',
      'set-cookie': res.headers.get('set-cookie') || '',
    },
  });
  return response;
}
