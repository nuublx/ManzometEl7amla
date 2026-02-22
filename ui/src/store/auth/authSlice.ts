import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services'
import { useDispatch } from 'react-redux'

type AuthState = {
    id?: number
    name?: string
    token?: string
    isAuthenticated: boolean
}

const initialState: AuthState = {
    id: undefined,
    name: undefined,
    token: undefined,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (
            state,
            action: PayloadAction<{ user: { id: number, name: string }, token: string }>
        ) => {
            state.id = action.payload.user.id
            state.name = action.payload.user.name
            state.token = action.payload.token
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.id = undefined
            state.name = undefined
            state.token = undefined
            state.isAuthenticated = false
        },
    },
})


export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { id: number; password: string }) => {
        const dispatch = useDispatch();
        const response = await authService.login(credentials)
        const data = response.data;
        if (!response.ok || data === undefined) {
            throw new Error(response.message)
        }

        dispatch(loginSuccess({
            user: data.user,
            token: data.token,
        }))
    }
)

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer