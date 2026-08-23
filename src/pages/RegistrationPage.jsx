import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import RegistrationForm from '../features/registration/RegistrationForm'

const RegistrationPage = () => (
  <div className="ds-app">
    <Header />
    <main className="ds-app-main">
      <div className="w-full max-w-4xl mx-auto px-4 pt-6 pb-2">
        <img
          src="/newbanner.jpeg"
          alt="FUE Global Membership — USD $99 | 10% OFF with FUEGLOBALMEMBER"
          className="w-full object-contain rounded-lg"
        />
        <div className="ds-login-banner">
          <div>
            <p className="ds-login-banner-title">Already a FUE Global member?</p>
            <p className="ds-login-banner-copy">
              Skip the form — sign in with your Membership ID to open your portal.
            </p>
          </div>
          <Link to="/login" className="btn-primary">Log in to your portal</Link>
        </div>
      </div>
      <RegistrationForm />
    </main>
    <Footer />
  </div>
)

export default RegistrationPage
