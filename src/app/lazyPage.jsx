import { lazy, Suspense } from 'react'
import RouteFallback from '../components/feedback/RouteFallback'

const lazyPage = (importer) => {
  const Page = lazy(importer)

  const LazyRoute = (props) => (
    <Suspense fallback={<RouteFallback />}>
      <Page {...props} />
    </Suspense>
  )

  return LazyRoute
}

export default lazyPage
