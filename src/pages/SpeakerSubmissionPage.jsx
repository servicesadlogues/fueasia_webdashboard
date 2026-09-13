import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SpeakerForm from '../features/speaker/SpeakerForm'
import { SPEAKER_BANNER_URL } from '../constants/brand'

const SpeakerSubmissionPage = () => (
  <div className="ds-app">
    <Header subtitle="Speaker Submission Portal" />
    <main className="ds-app-main">
      <div className="w-full max-w-4xl mx-auto px-4 pt-6 pb-2">
        <img
          src={SPEAKER_BANNER_URL}
          alt="Wide Conferences and Exhibitions - Your Trusted Event Management Partner"
          className="w-full object-contain rounded-lg"
        />
      </div>
      <SpeakerForm />
    </main>
    <Footer />
  </div>
)

export default SpeakerSubmissionPage
