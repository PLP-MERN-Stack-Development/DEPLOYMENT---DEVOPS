import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // We don't need to use the `error` parameter here
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Logging the error for debugging or reporting
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-danger-light text-danger-dark p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="mb-4">
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-dark text-white rounded-md hover:bg-primary-light transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
