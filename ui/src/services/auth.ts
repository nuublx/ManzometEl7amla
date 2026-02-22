export type AuthMode = 'login'
const API_BASE = import.meta.env.VITE_API_BASE_URL

type AuthPayload = {
  id: number
  password: string
}

type ApiResponse<T> = {
  ok: boolean
  message: string
  data?: T
}

const login = async (payload: AuthPayload): Promise<ApiResponse<{user: {id: number, name: string}, token: string}>> => {
  const result = await fetch(`${API_BASE}/api/Auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!result.ok) {
    const errorData = await result.json()
    throw new Error(errorData.message || 'Login failed')
  }
  
  return await result.json()
}
export const authService = {
  login: (payload: AuthPayload) => login(payload),
  apiBase: API_BASE,
}
