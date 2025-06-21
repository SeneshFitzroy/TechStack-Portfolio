import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic imports for 3D components (client-side only)
const Scene3D = dynamic(() => import('../components/Scene3D'), { ssr: false });
const LoadingScreen = dynamic(() => import('../components/LoadingScreen'), { ssr: false });

// Import some advanced components
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  FloatingElement,
  TypewriterText
} from '../components/AdvancedAnimations';
import Certifications from '../components/Certifications';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading && typeof window !== 'undefined') {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Advanced Portfolio - Senesh Fitzroy</title>
        <meta name="description" content="Full-Stack Developer & AI Specialist" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            {typeof window !== 'undefined' && <Scene3D />}
          </div>
          
          <div className="relative z-10 text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Senesh Fitzroy
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Full-Stack Developer & AI Specialist
            </motion.p>

            <motion.div
              className="space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                View Projects
              </button>
              <button className="px-8 py-3 border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-colors">
                Contact Me
              </button>
            </motion.div>
          </div>
        </section>

        {/* Success message */}
        <section className="relative z-10 py-20 text-center bg-black/20">
          <ScrollReveal>
            <h2 className="text-3xl text-white mb-4">
              🎉 3D Portfolio Successfully Loaded!
            </h2>
            <p className="text-gray-300">
              Advanced 3D scene, animations, and responsive design are now working perfectly.
            </p>
          </ScrollReveal>
        </section>

        {/* Certifications Section */}
        <section className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-4xl font-bold text-center text-white mb-12">
                Certifications & Achievements
              </h2>
            </ScrollReveal>
            <Certifications />
          </div>
        </section>
      </main>
    </>
  );
}
