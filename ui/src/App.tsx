import { FormEvent, useMemo, useState } from 'react'
import './App.css'
import { AuthMode, authService } from './services/auth'

type Mode = AuthMode

type ApiResult = {
  status: 'success' | 'error'
  message: string
}

function App() {
  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ApiResult | null>(null)

  const endpointHint = useMemo(() => authService.endpoints[mode].join(' or '), [mode])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const payload = { name, password: mode === 'forgot' ? newPassword : password }
      const response =
        mode === 'login'
          ? await authService.login(payload)
          : mode === 'signup'
            ? await authService.signup(payload)
            : await authService.forgotPassword(payload)

      setResult({
        status: response.ok ? 'success' : 'error',
        message: response.message,
      })
    } catch (error) {
      setResult({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unexpected error occurred.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-vh-100 d-flex align-items-center bg-dark text-light py-4" data-bs-theme="dark">
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card bg-black border-secondary shadow-lg">
              <div className="card-body p-4">
                <h1 className="h3 mb-2">Welcome</h1>
                <p className="text-secondary mb-4">Login, create an account, or recover your password.</p>

                <div className="btn-group w-100 mb-4" role="tablist" aria-label="Auth modes">
                  <button
                    type="button"
                    className={`btn ${mode === 'login' ? 'btn-primary' : 'btn-outline-light'}`}
                    onClick={() => setMode('login')}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className={`btn ${mode === 'signup' ? 'btn-primary' : 'btn-outline-light'}`}
                    onClick={() => setMode('signup')}
                  >
                    Signup
                  </button>
                  <button
                    type="button"
                    className={`btn ${mode === 'forgot' ? 'btn-primary' : 'btn-outline-light'}`}
                    onClick={() => setMode('forgot')}
                  >
                    Forgot Password
                  </button>
                </div>

                <form onSubmit={submit} className="d-grid gap-3">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Username
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter your username"
                      required
                    />
                  </div>

                  {mode !== 'forgot' ? (
                    <div>
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="new-password" className="form-label">
                        New Password
                      </label>
                      <input
                        id="new-password"
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        placeholder="Enter your new password"
                        required
                      />
                    </div>
                  )}

                  <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                    {loading
                      ? 'Please wait...'
                      : mode === 'login'
                        ? 'Login'
                        : mode === 'signup'
                          ? 'Create Account'
                          : 'Reset Password'}
                  </button>
                </form>

                <p className="small text-secondary mt-3 mb-0 text-break">
                  Endpoint: {authService.apiBase}
                  {endpointHint}
                </p>

                {result && (
                  <div className={`alert mt-3 mb-0 ${result.status === 'success' ? 'alert-success' : 'alert-danger'}`}>
                    {result.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
