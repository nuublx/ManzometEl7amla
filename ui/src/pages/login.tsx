import { useState } from "react"
import '../App.css'
import { connect } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { login } from "../store/auth/authSlice"

const _loginPage = (props: any) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async (event: any) => {
        event.preventDefault()
        setLoading(true)
        if (id === undefined || password.trim() === '') {
            return;
        }
        props.login(+id, password);

        setLoading(false)
    }

return (
    <section className="container">
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
                <div className="card bg-black border-secondary shadow-lg">
                    <div className="card-body p-4">
                        <h1 className="h3 mb-2" style={{ display: 'flex', }}>إدارة النقل منظومة الحملة</h1>
                        <p className="text-secondary mb-4">تسجيل الدخول إلى النظام</p>

                        <form onSubmit={submit} className="d-grid gap-3">
                            <div>
                                <label htmlFor="name" className="form-label">
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
                            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                                {loading
                                    ? 'برجاء الانتظار...'
                                    : 'تسجيل الدخول'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
}
const mapStateToProps = (state: RootState) => ({
    isAuthuhenticated: state.auth.isAuthenticated,
    id: state.auth.id,
    token: state.auth.token,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    login: (id: number, password: string) => dispatch(login({id, password}))
})
export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(_loginPage)