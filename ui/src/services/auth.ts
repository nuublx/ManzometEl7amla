export type AuthMode = 'login' | 'signup' | 'forgot'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

const ENDPOINTS: Record<AuthMode, string[]> = {
  login: ['/api/Auth/login'],
  signup: ['/api/Auth/signup', '/api/Auth/register'],
  forgot: ['/api/Auth/forget-password', '/api/Auth/forgot-password'],
}

type AuthPayload = {
  name: string
  password: string
}

type ApiResponse = {
  ok: boolean
  message: string
}

const parseError = (data: unknown, response: Response) => {
  if (typeof data === 'object' && data && 'message' in data) {
    return String(data.message)
  }

  return `${response.status} ${response.statusText}`
}

const callWithFallback = async (mode: AuthMode, payload: AuthPayload): Promise<ApiResponse> => {
  let response: Response | null = null

  for (const endpoint of ENDPOINTS[mode]) {
    response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (response.status !== 404) break
  }

  if (!response) {
    return { ok: false, message: 'Could not reach the authentication API.' }
  }

  const contentType = response.headers.get('content-type') ?? ''
  const data = contentType.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    return { ok: false, message: parseError(data, response) }
  }

  return {
    ok: true,
    message:
      mode === 'login'
        ? 'Login successful.'
        : mode === 'signup'
          ? 'Account created successfully.'
          : 'Password reset request sent.',
  }
}

export const authService = {
  login: (payload: AuthPayload) => callWithFallback('login', payload),
  signup: (payload: AuthPayload) => callWithFallback('signup', payload),
  forgotPassword: (payload: AuthPayload) => callWithFallback('forgot', payload),
  endpoints: ENDPOINTS,
  apiBase: API_BASE,
}
