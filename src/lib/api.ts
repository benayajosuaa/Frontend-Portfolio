/**
 * API Service untuk komunikasi dengan backend
 * Base URL: https://backend-portfolio-ben.vercel.app/
 * 
 * Support 2 endpoint formats:
 * - /journeys (preferred)
 * - /api/journeys (fallback)
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://serverless-backend-porto-vercel.vercel.app";

/**
 * Fungsi helper untuk membuat API request dengan fallback endpoints
 */
async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  let url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error on ${endpoint}: ${response.status}`, errorText);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`API Call Failed: ${endpoint}`, error);
    throw error;
  }
}

// ==================== Journey API ====================
export interface Journey {
  id: number;
  title: string;
  type: 'Education' | 'Work' | 'Organization';
  year: number | null;
  order_index: number;
  cover_image: string;
  excerpt: string | null;
  content: string | null;
}

export async function getJourneys(): Promise<Journey[]> {
  return apiCall<{ data: Journey[] }>('/journeys').then(res => res.data);
}

export async function getJourneyById(id: number): Promise<Journey> {
  return apiCall<Journey>(`/journeys/${id}`);
}

export async function createJourney(data: Omit<Journey, 'id'>): Promise<Journey> {
  return apiCall<Journey>('/journeys', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateJourney(id: number, data: Partial<Journey>): Promise<Journey> {
  return apiCall<Journey>(`/journeys/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteJourney(id: number): Promise<void> {
  return apiCall<void>(`/journeys/${id}`, {
    method: 'DELETE',
  });
}

// ==================== Work/Portfolio API ====================
export interface Work {
  id: number;
  title: string;
  excerpt: string;
  cover_image: string;
  github_url?: string;
  demo_url?: string;
  drive_url?: string;
  status: string;
}

export async function getWorks(): Promise<Work[]> {
  return apiCall<{ data: Work[] }>('/works').then(res => res.data);
}

export async function getWorkById(id: number): Promise<Work> {
  return apiCall<Work>(`/works/${id}`);
}

export async function createWork(data: Omit<Work, 'id'>): Promise<Work> {
  return apiCall<Work>('/works', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateWork(id: number, data: Partial<Work>): Promise<Work> {
  return apiCall<Work>(`/works/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteWork(id: number): Promise<void> {
  return apiCall<void>(`/works/${id}`, {
    method: 'DELETE',
  });
}

// ==================== Contact API ====================
export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
  status?: string;
  created_at?: string;
}

export async function getContacts(token: string): Promise<Contact[]> {
  return apiCall<{ data: Contact[] }>('/contact', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data);
}

export async function getContactById(id: number, token: string): Promise<Contact> {
  return apiCall<Contact>(`/contact/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createContact(data: Omit<Contact, 'id' | 'created_at' | 'status'>): Promise<Contact> {
  return apiCall<Contact>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateContactStatus(id: number, status: string, token: string): Promise<Contact> {
  return apiCall<Contact>(`/contact/${id}/status`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
}

export async function deleteContact(id: number, token: string): Promise<void> {
  return apiCall<void>(`/contact/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
