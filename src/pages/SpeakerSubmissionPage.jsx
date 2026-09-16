import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SpeakerForm from '../features/speaker/SpeakerForm'
import {
  SPEAKER_BANNER_EVENT_LINE,
  SPEAKER_BANNER_HEADLINE,
  SPEAKER_BANNER_SUBTITLE,
} from '../features/speaker/constants'
import { SPEAKER_BANNER_URL } from '../constants/brand'

const SpeakerSubmissionPage = () => (
  <div className="ds-app">
    <Header subtitle="Speaker Submission Portal" />
    <main id="main-content" className="ds-app-main">
      <div className="w-full px-3 sm:px-[2%] pt-4 sm:pt-6 pb-2">
        <div className="relative w-full overflow-hidden rounded-xl aspect-[1350/700] max-h-[42vh] sm:max-h-none shadow-sm">
          <img
            src={SPEAKER_BANNER_URL}
            alt={`${SPEAKER_BANNER_HEADLINE} - ${SPEAKER_BANNER_SUBTITLE}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none bg-black/70"
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
            <div className="text-center text-white">
              <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {SPEAKER_BANNER_HEADLINE}
              </h2>
              <p className="mt-1 sm:mt-2 text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
                {SPEAKER_BANNER_SUBTITLE}
              </p>
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-lg md:text-xl lg:text-2xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
                {SPEAKER_BANNER_EVENT_LINE}
              </p>
            </div>
          </div>
        </div>
      </div>
      <SpeakerForm />
    </main>
    <Footer />
  </div>
)

export default SpeakerSubmissionPage
