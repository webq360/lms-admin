const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function fetchAdminApi<T = any>(
  endpoint: string,
  options: RequestInit & { token?: string } = {}
): Promise<{ success: boolean; data?: T; message?: string; error?: any; pagination?: any }> {
  const { token, ...customConfig } = options;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const activeToken =
    token || (typeof window !== 'undefined' ? localStorage.getItem('lms_admin_token') : null);

  if (activeToken) {
    headers['Authorization'] = `Bearer ${activeToken}`;
  }

  const config: RequestInit = {
    ...customConfig,
    headers,
  };

  try {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || { message: data.message || 'Request failed' },
      };
    }

    return data;
  } catch (err: any) {
    return {
      success: false,
      error: { message: err.message || 'Network error' },
    };
  }
}

