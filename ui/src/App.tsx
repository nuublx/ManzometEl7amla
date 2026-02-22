import { LoginPage } from './pages/login'
import { useAppSelector } from './store/hooks'
import { SystemCodesPage } from './pages/systemCodes'

function App() {
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
