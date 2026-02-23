import { LoginPage } from './pages/login'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { SystemCodesPage } from './pages/systemCodes'
import { useEffect } from 'react';
import { initialLoad } from './store/auth/authSlice';

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initialLoad());
  },[])
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  if (!isAuthenticated) {
    return (
      <main className="min-vh-100 d-flex align-items-center bg-dark text-light py-4" data-bs-theme="dark" dir="rtl">
        <LoginPage />
      </main>
    )
  }

  return <SystemCodesPage />
}

export default App