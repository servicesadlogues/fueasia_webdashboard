import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const PaymentSuccess = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-navy mb-2">Registration Successful!</h2>
          <p className="text-gray-500 text-sm mb-6">
            A confirmation email has been sent to <strong>{state?.email}</strong>
          </p>

          <div className="bg-primary-light border border-primary-border rounded-lg p-5 mb-6 text-left">
            <p className="text-xs text-gray-500 mb-1">Your Membership ID</p>
            <p className="text-primary font-bold text-2xl tracking-widest mb-4">{state?.membershipId}</p>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Name</span>
                <span className="font-medium">{state?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Valid Until</span>
                <span className="font-medium">{formatDate(state?.expiryDate)}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-6">
            Please save your Membership ID for conference participation and member benefits.
          </p>

          <button
            onClick={() => navigate('/')}
            className="btn-primary w-full"
          >
            Register Another Member
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PaymentSuccess
