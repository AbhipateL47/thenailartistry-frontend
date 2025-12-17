import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
          <h1 style={{ color: '#e11d48', marginBottom: '16px' }}>Something went wrong</h1>
          <p style={{ marginBottom: '16px' }}>Please refresh the page or contact support if the problem persists.</p>
          <details style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '8px' }}>Error Details</summary>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {this.state.error?.toString()}
            </pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '16px',
              padding: '10px 20px',
              backgroundColor: '#ec4899',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

