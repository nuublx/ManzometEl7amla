import { apiClient } from "./apiClient"

export type AuthMode = 'login'

type AuthPayload = {
  id: number
  password: string
}


const login = async (payload: AuthPayload): Promise<{user: {id: number, name: string}}> => {
  const result = await apiClient<AuthPayload>(`/api/Auth/login`,payload,{ method: 'POST' });
  
  if (!result.ok) {
    const errorData = await result.json();
    throw new Error(errorData.message || 'Login failed');
  }
  
  return await result.json()
}

export async function checkAuth(): Promise<{user: {id: number, name: string}} | undefined> {
  const result = await apiClient('/Auth/check-auth')
  if (result.ok) {
    return await result.json()
  }
  return undefined;
}

export const authService = {
  login: (payload: AuthPayload) => login(payload),
  checkAuth: () => checkAuth(),
  
}
