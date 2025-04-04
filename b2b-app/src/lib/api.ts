import { redirect } from 'next/navigation';

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

export async function api(endpoint: string, options: ApiOptions = {}) {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
    ...options.headers,
  };

  try {
    console.log(`Making API request to: /api${endpoint}`);
    const response = await fetch(`/api${endpoint}`, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: 'include', // This is important for cookies
    });

    const data = await response.json().catch(() => null);
    console.log('API response:', { status: response.status, data });

    // If the response is a redirect, follow it
    if (response.redirected) {
      window.location.href = response.url;
      return;
    }

    // Handle unauthorized responses
    if (response.status === 401) {
      localStorage.removeItem('accessToken');
      redirect('/login');
      return;
    }

    if (!response.ok) {
      throw new Error(data?.error || `API request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
} 