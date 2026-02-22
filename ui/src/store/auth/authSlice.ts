import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services'

type AuthState = {
  id?: number
  name?: string
  token?: string
  isAuthenticated: boolean
  loading: boolean
  error?: string
}

const initialState: AuthState = {
  id: undefined,
  name: undefined,
  token: undefined,
  isAuthenticated: false,
  loading: false,
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { id: number; password: string }, thunkApi) => {
    const response = await authService.login(credentials)
    const data = response.data

    if (!response.ok || data === undefined) {
      throw new Error(response.message || 'Login failed')
    }

    thunkApi.dispatch(
      loginSuccess({
        user: data.user,
        token: data.token,
      }),
    )
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: { id: number; name: string }; token: string }>,
    ) => {
      state.id = action.payload.user.id
      state.name = action.payload.user.name
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = undefined
    },
    logout: (state) => {
      state.id = undefined
      state.name = undefined
      state.token = undefined
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
