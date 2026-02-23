const API_BASE = import.meta.env.VITE_API_BASE_URL

type ApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: unknown
  headers?: Record<string, string>
}

export async function apiClient<T>(
  endpoint: string,
  body?: T,
  options: ApiOptions = {}
): Promise<Response> {
  const { method = 'GET', headers = {} } = options

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    credentials: 'include', // 🔥 REQUIRED for cookie auth
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  // Auto logout / redirect on 401
  if (response.status === 401) {
    // Optional: redirect to login
    window.location.href = '/login'
    throw new Error('Unauthorized')
  }
  return response;
}