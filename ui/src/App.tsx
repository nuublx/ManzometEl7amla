import { useEffect, useState, type ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/login'
import { HomePage } from './pages/home'
import { SystemCodesPage } from './pages/systemCodes'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { initialLoad } from './store/auth/authSlice'

const LoginRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="min-vh-100 d-flex align-items-center bg-dark text-light py-4" data-bs-theme="dark" dir="rtl">
      <LoginPage />
    </main>
  )
}

const ProtectedRoute = ({ isAuthenticated, element }: { isAuthenticated: boolean; element: ReactElement }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return element
}

function App() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false)

  useEffect(() => {
    dispatch(initialLoad()).finally(() => setIsInitialLoadDone(true))
  }, [dispatch])

  if (!isInitialLoadDone) {
    return null
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginRoute isAuthenticated={isAuthenticated} />} />
      <Route path="/Home" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<HomePage />} />} />
      <Route
        path="/system-codes"
        element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<SystemCodesPage />} />}
      />
      <Route path="*" element={<Navigate to="/Home" replace />} />
    </Routes>
  )
}

export default App
