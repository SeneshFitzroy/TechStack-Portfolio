import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

// 3D Loading Orb
function LoadingOrb() {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime();
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.7;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.6}
        speed={3}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

// Loading Progress Bar
function LoadingProgress({ progress }) {
  return (
    <div className="loading-progress">
      <motion.div
        className="loading-progress-bar"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
      <span className="loading-percentage">{Math.round(progress)}%</span>
    </div>
  );
}

// Main Loading Screen Component
export default function LoadingScreen({ isLoading, onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  
  const loadingTexts = [
    "Initializing Experience...",
    "Loading 3D Assets...",
    "Preparing Portfolio...",
    "Almost Ready...",
    "Welcome!"
  ];

  useEffect(() => {
    if (isLoading) {
      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => onLoadingComplete(), 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Change loading text
      const textInterval = setInterval(() => {
        setCurrentText(prev => (prev + 1) % loadingTexts.length);
      }, 800);

      return () => {
        clearInterval(interval);
        clearInterval(textInterval);
      };
    }
  }, [isLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          {/* 3D Background */}
          <div className="loading-3d-bg">
            <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <LoadingOrb />
            </Canvas>
          </div>

          {/* Loading Content */}
          <div className="loading-content">
            <motion.div
              className="loading-logo"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity }
              }}
            >
              <div className="loading-logo-inner">SF</div>
            </motion.div>

            <motion.h1
              className="loading-title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Senesh Fitzroy
            </motion.h1>

            <motion.p
              className="loading-subtitle"
              key={currentText}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {loadingTexts[currentText]}
            </motion.p>

            <LoadingProgress progress={progress} />

            {/* Animated Dots */}
            <div className="loading-dots">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="loading-dot"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>

          {/* Loading Particles */}
          <div className="loading-particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="loading-particle"
                initial={{ 
                  x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
                  y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
                  opacity: 0
                }}
                animate={{
                  x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
                  y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          <style jsx>{`
            .loading-screen {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
              overflow: hidden;
            }

            .loading-3d-bg {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0.3;
            }

            .loading-content {
              text-align: center;
              z-index: 2;
              position: relative;
            }

            .loading-logo {
              width: 80px;
              height: 80px;
              margin: 0 auto 2rem;
              background: linear-gradient(45deg, #3b82f6, #8b5cf6);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
            }

            .loading-logo-inner {
              color: white;
              font-size: 2rem;
              font-weight: bold;
            }

            .loading-title {
              font-size: 3rem;
              color: white;
              margin-bottom: 1rem;
              background: linear-gradient(45deg, #3b82f6, #8b5cf6);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }

            .loading-subtitle {
              font-size: 1.2rem;
              color: #94a3b8;
              margin-bottom: 3rem;
              height: 30px;
            }

            .loading-progress {
              width: 300px;
              height: 4px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 2px;
              margin: 0 auto 2rem;
              overflow: hidden;
              position: relative;
            }

            .loading-progress-bar {
              height: 100%;
              background: linear-gradient(90deg, #3b82f6, #8b5cf6);
              border-radius: 2px;
              box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
            }

            .loading-percentage {
              position: absolute;
              top: 1rem;
              left: 50%;
              transform: translateX(-50%);
              color: white;
              font-size: 0.9rem;
            }

            .loading-dots {
              display: flex;
              justify-content: center;
              gap: 0.5rem;
              margin-top: 2rem;
            }

            .loading-dot {
              width: 8px;
              height: 8px;
              background: #3b82f6;
              border-radius: 50%;
            }

            .loading-particles {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
            }

            .loading-particle {
              position: absolute;
              width: 4px;
              height: 4px;
              background: #8b5cf6;
              border-radius: 50%;
              box-shadow: 0 0 6px #8b5cf6;
            }

            @media (max-width: 768px) {
              .loading-title {
                font-size: 2rem;
              }
              
              .loading-progress {
                width: 250px;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}