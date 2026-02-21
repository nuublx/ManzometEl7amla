import { useState } from "react"
import '../App.css'
import { type AuthMode, authService } from "../services/auth"


type Mode = AuthMode

type ApiResult = {
  status: 'success' | 'error'
  message: string
}

export const LoginPage = () => {
    const [mode, setMode] = useState<Mode>('login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<ApiResult | null>(null)
    
const submit = async (event: any) => {
    event.preventDefault()
    setLoading(true)
    setResult(null)

    try {
        const payload = { name, password: password }
        const response =
            mode === 'login'
                ? await authService.login(payload)
                : await authService.signup(payload)

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
        <section className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card bg-black border-secondary shadow-lg">
                        <div className="card-body p-4">
                            <h1 className="h3 mb-2" style={{ display: 'flex', }}>إدارة النقل منظومة الحملة</h1>
                            <p className="text-secondary mb-4">تسجيل الدخول إلى النظام</p>

                            <div className="btn-group w-100 mb-4" role="tablist" aria-label="Auth modes">
                                <button
                                    type="button"
                                    className={`btn ${mode === 'login' ? 'btn-primary' : 'btn-outline-light'}`}
                                    onClick={() => setMode('login')}
                                >
                                    تسجيل الدخول
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${mode === 'signup' ? 'btn-primary' : 'btn-outline-light'}`}
                                    onClick={() => setMode('signup')}
                                >
                                    إنشاء حساب
                                </button>
                                {/* <button
                                    type="button"
                                    className={`btn ${mode === 'forgot' ? 'btn-primary' : 'btn-outline-light'}`}
                                    onClick={() => setMode('forgot')}
                                >
                                    استعادة كلمة المرور
                                </button> */}
                            </div>

                            <form onSubmit={submit} className="d-grid gap-3">
                                <div>
                                    <label htmlFor="name" className="form-label">
                                        كود المستخدم
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
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
                                {/* ) : (
                                    <div>
                                        <label htmlFor="new-password" className="form-label">
                                            كلمة المرور الجديدة
                                        </label>
                                        <input
                                            id="new-password"
                                            type="password"
                                            className="form-control"
                                            value={newPassword}
                                            onChange={(event) => setNewPassword(event.target.value)}
                                            placeholder="أدخل كلمة المرور الجديدة"
                                            required
                                        />
                                    </div>
                                )} */}

                                <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                                    {loading
                                        ? 'برجاء الانتظار...'
                                        : mode === 'login'
                                            ? 'تسجيل الدخول'
                                            : 'إنشاء حساب'}
                                              
                                </button>
                            </form>
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
    );
}