import { Routes, Route, Navigate } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailed from './pages/PaymentFailed'

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failed" element={<PaymentFailed />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
