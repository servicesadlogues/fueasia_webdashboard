import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import RegistrationForm from '../features/registration/RegistrationForm'

const RegistrationPage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 bg-gray-50">
      {/* Banner */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-6 pb-2">
        <img
          src="/banner.png"
          alt="FUE Asia Membership — USD $99 | 10% OFF with FUEGLOBALMEMBER"
          className="w-full object-contain rounded-lg"
        />
      </div>
      <RegistrationForm />
    </main>
    <Footer />
  </div>
)

export default RegistrationPage
