import './login.css'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { login } from '../store/auth/authSlice'

export const LoginPage = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.auth.loading)
  const error = useAppSelector((state) => state.auth.error)

  const submit = async (event: React.SubmitEvent) => {
    event.preventDefault()
    if (!id.trim() || !password.trim()) {
      return
    }

    await dispatch(login({ id: Number(id), password }))
  }

  return (
    <section className="container login-page">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg login-card">
            <div className="card-body p-4">
              <h1 className="h3 mb-2" style={{ display: 'flex' }}>
                إدارة النقل منظومة الحملة
              </h1>
              <p className="text-secondary mb-4">تسجيل الدخول إلى النظام</p>

              <form onSubmit={submit} className="d-grid gap-3">
                <div>
                  <label htmlFor="id" className="form-label">
                    كود المستخدم
                  </label>
                  <input
                    id="id"
                    type="text"
                    className="form-control"
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                    placeholder="أدخل كود المستخدم"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="form-label">
                    كلمة المرور
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="أدخل كلمة المرور"
                    required
                  />
                </div>
                {error ? <small className="text-danger">{error}</small> : null}
                <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                  {loading ? 'برجاء الانتظار...' : 'تسجيل الدخول'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
