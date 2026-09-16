import AppErrorBoundary from './components/feedback/AppErrorBoundary'
import AppRoutes from './app/AppRoutes'

function App() {
  return (
    <AppErrorBoundary>
      <AppRoutes />
    </AppErrorBoundary>
  )
}

export default App
