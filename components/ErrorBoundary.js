import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Portfolio error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI that allows the user to recover
      return (
        <div className="error-page">
          <div className="error-container">
            <h1>Something went wrong</h1>
            <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
            <button onClick={() => window.location.reload()} className="error-btn">
              Refresh Page
            </button>
          </div>
          <style jsx>{`
            .error-page {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
              font-family: 'Poppins', sans-serif;
            }
            
            .error-container {
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 500px;
              width: 90%;
            }
            
            h1 {
              color: #3B82F6;
              margin-bottom: 1rem;
            }
            
            p {
              margin-bottom: 2rem;
              color: #4B5563;
            }
            
            .error-btn {
              background: #3B82F6;
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 8px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            
            .error-btn:hover {
              background: #2563EB;
              transform: translateY(-3px);
              box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}
