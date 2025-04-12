import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // Register GSAP ScrollTrigger plugin when available
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const { gsap, ScrollTrigger } = window;
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);
  
  return <Component {...pageProps} />;
}

export default MyApp;
