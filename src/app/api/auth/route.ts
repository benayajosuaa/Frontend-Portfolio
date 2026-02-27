import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:8080';


export async function POST(req: NextRequest) {
  // Selalu arahkan ke endpoint login backend
  const bodyText = await req.text();
  let body: any = {};
  try {
    body = JSON.parse(bodyText);
  } catch {}

  // Endpoint HARUS '/api/auth/login'
  const endpoint = '/api/auth/login';

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
