import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const PaymentFailed = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-navy mb-2">Payment Failed</h2>
          <p className="text-gray-500 text-sm mb-6">
            Your payment could not be processed. No amount has been deducted.
            Please try again or contact support.
          </p>
          <div className="space-y-3">
            <button onClick={() => navigate('/')} className="btn-primary w-full">
              Try Again
            </button>
            <a
              href="mailto:info@fueasia.com"
              className="block text-sm text-primary underline"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PaymentFailed
