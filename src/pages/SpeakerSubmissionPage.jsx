import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SpeakerForm from '../features/speaker/SpeakerForm'
import { SPEAKER_BANNER_TITLE } from '../features/speaker/constants'
import { SPEAKER_BANNER_URL } from '../constants/brand'

const SpeakerSubmissionPage = () => (
  <div className="ds-app">
    <Header subtitle="Speaker Submission Portal" />
    <main className="ds-app-main">
      <div className="w-full max-w-4xl mx-auto px-4 pt-6 pb-2">
        <div className="relative w-full overflow-hidden rounded-lg aspect-[1350/700]">
          <img
            src={SPEAKER_BANNER_URL}
            alt={SPEAKER_BANNER_TITLE}
            className="w-full h-full object-cover block"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center px-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
              {SPEAKER_BANNER_TITLE}
            </h2>
          </div>
        </div>
      </div>
      <SpeakerForm />
    </main>
    <Footer />
  </div>
)

export default SpeakerSubmissionPage
