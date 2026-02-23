import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <main
      className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-light py-4"
      data-bs-theme="dark"
      dir="rtl"
    >
      <section className="card shadow-lg p-4 text-center" style={{ minWidth: '320px' }}>
        <h1 className="h3 mb-3">الصفحة الرئيسية</h1>
        <button className="btn btn-primary" onClick={() => navigate('/system-codes')}>
          أكواد النظام
        </button>
      </section>
    </main>
  )
}
