import { Component } from 'react'
import Button from '../ui/Button'

const ErrorFallback = ({ onRetry }) => (
  <div className="flex min-h-[50vh] items-center justify-center px-4 py-16">
    <div className="section-card mb-0 w-full max-w-md">
      <div className="section-body text-center">
        <h1 className="ds-heading">Something went wrong</h1>
        <p className="ds-muted mt-3 leading-relaxed">
          An unexpected error occurred. You can try again, or reload the page.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="outline" onClick={onRetry}>
            Try again
          </Button>
          <Button onClick={() => window.location.reload()}>
            Reload page
          </Button>
        </div>
      </div>
    </div>
  </div>
)

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('AppErrorBoundary', error, info?.componentStack)
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={this.handleRetry} />
    }
    return this.props.children
  }
}

export default AppErrorBoundary
