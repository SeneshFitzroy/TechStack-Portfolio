import { useEffect } from 'react';
import Head from 'next/head';
import { ErrorBoundary } from '../components/ErrorBoundary';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // Performance optimizations and error handling
  useEffect(() => {
    // Register service worker for better performance and offline capability
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Silent fallback - don't break the app if SW fails
        });
      });
    }

    // Preload critical resources
    const preloadLinks = [
      { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap', as: 'style' },
      { rel: 'preload', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css', as: 'style' },
      { rel: 'preload', href: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', as: 'script' },
      { rel: 'preload', href: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', as: 'script' }
    ];

    preloadLinks.forEach(link => {
      const linkEl = document.createElement('link');
      Object.keys(link).forEach(attr => {
        linkEl.setAttribute(attr, link[attr]);
      });
      document.head.appendChild(linkEl);
    });

    // Add global error handling
    const originalError = console.error;
    console.error = (...args) => {
      // Log to monitoring service or handle specific errors here
      originalError.apply(console, args);
    };

    // Monitor for unhandled errors
    window.addEventListener('error', (event) => {
      // Prevent complete UI crashes on script errors
      if (event.target.tagName === 'SCRIPT' || event.target.tagName === 'LINK') {
        event.preventDefault();
      }
    }, true);

    // Clean up
    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://students.nsbm.ac.lk" />
      </Head>
      
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
